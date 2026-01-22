import { useState } from "react";
import { useAddHotelMutation } from "../../services/hotelService";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const AddHotel = () => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    description: "",
    starRating: "",
    propertyType: "",
    status: "active",
  });

  const [addHotel, { isLoading }] = useAddHotelMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.propertyType) {
      toast.error("Name and Property Type are required");
      return;
    }

    try {
      await addHotel(form).unwrap();
      toast.success("Hotel added successfully");
      setForm({
        name: "",
        brand: "",
        description: "",
        starRating: "",
        propertyType: "",
        status: "active",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add hotel");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Toaster position="top-center" />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Hotel</h1>
        <Link
          to="/hotels"
          className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
        >
          Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hotel Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Hotel Taj Palace"
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Taj Group"
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Star Rating
            </label>
            <input
              type="number"
              name="starRating"
              value={form.starRating}
              onChange={handleChange}
              placeholder="5"
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Property Type
            </label>
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select Type</option>
              <option value="Hotel">Hotel</option>
              <option value="Resort">Resort</option>
              <option value="Villa">Villa</option>
              <option value="Hostel">Hostel</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Short hotel description..."
            className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="reset"
            onClick={() =>
              setForm({
                name: "",
                brand: "",
                description: "",
                starRating: "",
                propertyType: "",
                status: "active",
              })
            }
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            Clear
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Add Hotel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHotel;
