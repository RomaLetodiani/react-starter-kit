import { Outlet } from 'react-router';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

export const PlatformRoot = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);
