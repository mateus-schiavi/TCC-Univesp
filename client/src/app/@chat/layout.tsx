'use client';
import * as TanStackQuery from '@tanstack/react-query';
const queryClient = new TanStackQuery.QueryClient();

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <TanStackQuery.QueryClientProvider client={queryClient}>
      {children}
    </TanStackQuery.QueryClientProvider>
  );
}
