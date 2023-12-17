import Navbar from "@/components/global/Navbar";
import Banner from "@/components/pages/home/Banner";
import DeviceSection from "@/components/pages/home/DeviceSection";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <DeviceSection />
    </div>
  );
};

export default HomePage;
