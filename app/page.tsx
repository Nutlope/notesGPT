import Header from '@/components/ui/Header';
import Banner from '@/components/pages/home/Banner';
import DeviceSection from '@/components/pages/home/DeviceSection';
import { getAuthToken } from './auth';

const HomePage = async () => {
  const token = await getAuthToken();
  console.log({ token });
  return (
    <div>
      <Header />
      <Banner />
      <DeviceSection />
    </div>
  );
};

export default HomePage;
