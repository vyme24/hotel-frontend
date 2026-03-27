import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { useGetHotelsQuery } from "../../redux/apiSlice";
import HotelCard from "../../components/HotelCard/HotelCard";
import { SkeletonGrid, ErrorState } from "../../components/Loader/Loader";
import "./Hotels.css";

const AMENITY_OPTIONS = ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Parking", "Bar", "Beach"];

export default function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    stars: searchParams.get("stars") ? searchParams.get("stars").split(",").map(Number).filter(Boolean) : [],
    amenities: searchParams.get("amenities") ? searchParams.get("amenities").split(",").filter(Boolean) : [],
    sort: searchParams.get("sort") || "rating",
    page: Math.max(Number(searchParams.get("page")) || 1, 1),
  });

  const queryParams = useMemo(() => {
    const next = {
      sort: filters.sort || "rating",
      page: filters.page,
      limit: 10,
    };

    if (filters.location) next.location = filters.location;
    if (filters.minPrice) next.minPrice = filters.minPrice;
    if (filters.maxPrice) next.maxPrice = filters.maxPrice;
    if (filters.stars.length) next.stars = filters.stars.join(",");
    if (filters.amenities.length) next.amenities = filters.amenities.join(",");

    return next;
  }, [filters]);

  const { data, isLoading, isError, refetch, isFetching } = useGetHotelsQuery(queryParams);
  const hotels = data?.hotels || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    const next = new URLSearchParams();
    if (filters.location) next.set("location", filters.location);
    if (filters.minPrice) next.set("minPrice", filters.minPrice);
    if (filters.maxPrice) next.set("maxPrice", filters.maxPrice);
    if (filters.stars.length) next.set("stars", filters.stars.join(","));
    if (filters.amenities.length) next.set("amenities", filters.amenities.join(","));
    if (filters.sort && filters.sort !== "rating") next.set("sort", filters.sort);
    if (filters.page > 1) next.set("page", String(filters.page));
    setSearchParams(next, { replace: true });
  }, [filters, setSearchParams]);

  const resetFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      stars: [],
      amenities: [],
      sort: "rating",
      page: 1,
    });
    setSidebarOpen(false);
  };

  const toggleStar = (star) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      stars: prev.stars.includes(star)
        ? prev.stars.filter((value) => value !== star)
        : [...prev.stars, star],
    }));
  };

  const toggleAmenity = (amenity) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((value) => value !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const visiblePages = useMemo(() => {
    const start = Math.max(1, filters.page - 2);
    const end = Math.min(totalPages, start + 4);
    const adjustedStart = Math.max(1, end - 4);
    return Array.from({ length: end - adjustedStart + 1 }, (_, index) => adjustedStart + index);
  }, [filters.page, totalPages]);

  return (
    <div className="hotels-page">
      <div className="hotels-page__header">
        <h1 className="hotels-page__header-title">
          {filters.location ? `Hotels in "${filters.location}"` : "All Hotels"}
        </h1>
        <p className="hotels-page__header-sub">
          {isLoading || isFetching ? "Loading..." : `${total} premium properties found`}
        </p>
      </div>

      <div className="hotels-page__body">
        <aside className={`hotels-sidebar${sidebarOpen ? " open" : ""}`}>
          <div className="hotels-sidebar__head">
            <h3>Filters</h3>
            <button className="hotels-sidebar__close" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
          </div>

          <div className="filter-group">
            <span className="filter-group__label">Destination</span>
            <input
              className="filter-price-input"
              style={{ width: "100%", boxSizing: "border-box" }}
              type="text"
              placeholder="City, hotel name..."
              value={filters.location}
              onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value, page: 1 }))}
            />
          </div>

          <div className="filter-group">
            <span className="filter-group__label">Price Range (INR/night)</span>
            <div className="filter-price-row">
              <input
                className="filter-price-input"
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value, page: 1 }))}
              />
              <span>-</span>
              <input
                className="filter-price-input"
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value, page: 1 }))}
              />
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-group__label">Star Rating</span>
            <div className="filter-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`filter-star-btn${filters.stars.includes(star) ? " active" : ""}`}
                  onClick={() => toggleStar(star)}
                >
                  {star}<Star size={10} />
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-group__label">Amenities</span>
            <div className="filter-amenities">
              {AMENITY_OPTIONS.map((amenity) => (
                <label key={amenity} className="filter-check">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-group__label">Sort By</span>
            <select
              className="hotels-sort"
              style={{ width: "100%" }}
              value={filters.sort}
              onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value, page: 1 }))}
            >
              <option value="rating">Highest Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <button className="filter-reset-btn" onClick={resetFilters}>
            <RotateCcw size={14} style={{ display: "inline", marginRight: 4 }} /> Reset All
          </button>
        </aside>

        <main className="hotels-content">
          <div className="hotels-content__topbar">
            <span className="hotels-count"><strong>{total}</strong> hotel{total !== 1 ? "s" : ""} found</span>
            <button className="hotels-filter-toggle" onClick={() => setSidebarOpen(true)}>
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          {isLoading ? (
            <SkeletonGrid count={10} />
          ) : isError ? (
            <ErrorState message="Failed to load hotels. Is the backend running?" onRetry={refetch} />
          ) : hotels.length === 0 ? (
            <div className="hotels-empty">
              <div className="hotels-empty__icon">Hotel</div>
              <div className="hotels-empty__title">No hotels found</div>
              <p>Try adjusting your filters or <button onClick={resetFilters} style={{ background: "none", border: "none", color: "#1E3A8A", cursor: "pointer", fontWeight: 700 }}>clear all filters</button></p>
            </div>
          ) : (
            <>
              <div className="hotels-grid">
                {hotels.map((hotel, index) => (
                  <motion.div
                    key={hotel._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <HotelCard hotel={hotel} />
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="hotels-pagination">
                  <button
                    type="button"
                    className="hotels-pagination__nav"
                    disabled={filters.page === 1}
                    onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
                  >
                    Previous
                  </button>

                  <div className="hotels-pagination__pages">
                    {visiblePages.map((pageNumber) => (
                      <button
                        type="button"
                        key={pageNumber}
                        className={`hotels-pagination__page${filters.page === pageNumber ? " active" : ""}`}
                        onClick={() => setFilters((prev) => ({ ...prev, page: pageNumber }))}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="hotels-pagination__nav"
                    disabled={filters.page === totalPages}
                    onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
