import Header from '@/components/ui/Header';
import Banner from '@/components/pages/home/Banner';
import DeviceSection from '@/components/pages/home/DeviceSection';
import ErrorBanner from '@/components/ui/error-banner';

const HomePage = () => {
  return (
    <div>
      <ErrorBanner />
      <Header />
      <Banner />
      <DeviceSection />
    </div>
  );
};

export default HomePage;
