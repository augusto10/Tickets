'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
        primaryColor: 'blue',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Notifications />
      <ModalsProvider />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
