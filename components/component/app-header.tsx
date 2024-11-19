'use client';

import { ThemesToggleFr } from './toggle-themes';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppAvatarDropdown } from '@/components/dropdowns/app-avatar-dropdown';
import { AppBreadcrumb } from './app-breadcrumb';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export function AppHeader() {
  const path = usePathname();
  const [showHeader, setShowHeader] = useState(true);
  const [scrollUpCounter, setScrollUpCounter] = useState(0);
  const scrollUpThreshold = 3; // Number of scroll-up events needed to show the header

  // useEffect(() => {
  //   const handleWheelScroll = (event: WheelEvent) => {
  //     if (event.deltaY > 0) {
  //       // Scrolling down
  //       setShowHeader(false);
  //       setScrollUpCounter(0); // Reset the counter when scrolling down
  //     } else {
  //       // Scrolling up
  //       setScrollUpCounter((prevCounter) => {
  //         const newCounter = prevCounter + 1;
  //         console.log(newCounter);
  //         if (newCounter >= scrollUpThreshold) {
  //           setShowHeader(true);
  //         }
  //         return newCounter;
  //       });
  //     }
  //   };

  //   window.addEventListener('wheel', handleWheelScroll);
  //   return () => {
  //     window.removeEventListener('wheel', handleWheelScroll);
  //   };
  // }, [scrollUpCounter, setScrollUpCounter]);

  return (
    <header
      id="app-header"
      className={`bg-app-header-background sticky top-0 flex h-32 min-h-fit place-content-between items-center px-4 transition-transform duration-300 md:h-20 ${showHeader ? 'translate-y-0 transform' : '-translate-y-full transform'}`}
    >
      <div className="flex items-center gap-x-3 rounded bg-background p-2 pr-3">
        <SidebarTrigger size={'sm'} />
        <AppBreadcrumb />
      </div>
      <div id="app-avatar-menu-trigger" className="flex items-center gap-4 justify-self-end">
        <ThemesToggleFr />
        <AppAvatarDropdown />
      </div>
    </header>
  );
}
