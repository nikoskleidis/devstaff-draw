import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { IBM_Plex_Sans } from '@next/font/google';
import { MantineProvider } from '@mantine/core';

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light'
      }}
    >
      <QueryClientProvider client={queryClient}>
        <div className={ibmPlexSans.className}>
          <Component {...pageProps} />
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </MantineProvider>
  );
}
