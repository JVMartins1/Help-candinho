'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { ToastProvider } from '@radix-ui/react-toast';

export function Providers({ children, ...props }: Readonly<ThemeProviderProps>) {
  return (
    <NextThemesProvider {...props}>
      <ToastProvider>{children}</ToastProvider>
    </NextThemesProvider>
  );
}
