import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate } from 'react-router';

import { MainErrorFallback } from '@/components/errors/main-error';
import { Spinner } from '@/components/ui/common/spinner';
import { Notifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { AuthLoader } from '@/lib/auth';
import { queryConfig } from '@/lib/react-query';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV && <ReactQueryDevtools />}
          <Notifications />
          <AuthLoader
            renderLoading={() => (
              <div className="flex h-screen w-screen items-center justify-center">
                <Spinner size="xl" />
              </div>
            )}
            renderError={() => <MainErrorFallback />}
            renderUnauthenticated={() => <Navigate to={paths.auth.login.getHref()} replace />}
          >
            {children}
          </AuthLoader>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
