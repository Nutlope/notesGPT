import Header from '@/components/ui/Header';
import ErrorBanner from '@/components/ui/error-banner';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <ErrorBanner />
      <Header />
      {children}
    </div>
  );
};

export default DashboardLayout;
