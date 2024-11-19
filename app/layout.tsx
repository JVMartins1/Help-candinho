import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { AppHeader } from '@/components/component/app-header';
import { AppSidebar } from '@/components/component/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Toast } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Fretemax',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background">
        <main>
          <Providers attribute="class" defaultTheme="system" enableSystem>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <AppHeader />
                <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </Providers>
        </main>
      </body>
    </html>
  );
}
