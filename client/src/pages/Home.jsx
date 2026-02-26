import Hero from "../components/Hero";
import FeaturedHotels from "../components/FeaturedHotels";
import FeaturedRooms from "../components/FeaturedRooms";
import FeaturedReviews from "../components/FeaturedReviews";

const Home = () => {
    return (
        <main className="bg-white dark:bg-[#050505]">
            <Hero />
            <FeaturedHotels />
            <FeaturedRooms />
            <FeaturedReviews />
        </main>
    )
}

export default Home;
