'use client';
import DashboardNav from '@/components/global/dashboardNav/DashboardNav';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <DashboardNav />
      {children}
    </div>
  );
};

export default DashboardLayout;
