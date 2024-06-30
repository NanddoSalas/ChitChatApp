import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { AuthContextProvider } from './AuthContext';
import { Router } from './Router';

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
  );

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <ReactQueryDevtools initialIsOpen={false} />

          <Router />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
