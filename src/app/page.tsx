
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import RoommateMatching from "@/components/home/RoommateMatching";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FeaturedRooms />
        <RoommateMatching />
        <HowItWorks />
      </main>

      <Footer />
    </>
  );
}
