'use client';

import { Calendar, ChevronRight, Cog, Home, Package, Search, Settings, Users } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import Link from 'next/link';
import { Label } from '../ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

const itensGroup = [
  {
    title: 'Geral',
    defaultOpen: true,
    items: [
      {
        title: 'Home',
        url: '/',
        icon: Home,
      },
    ],
  },
];

export function AppSidebar() {
  const { isMobile } = useSidebar();

  return (
    <Sidebar collapsible="offcanvas" variant="floating" className="bg-app-header-background text-background" id="app-sidebar">
      {isMobile && (
        <>
          <DialogTitle />
          <DialogDescription />
        </>
      )}
      <SidebarHeader className="flex justify-center p-0 md:h-20">
        <form>
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none stroke-app-header-foreground" />
              <SidebarInput id="search" placeholder="Pesquisar..." className="pl-8" />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
      </SidebarHeader>
      <SidebarContent>
        {itensGroup.map((group) => (
          <Collapsible
            key={group.title}
            title={group.title}
            defaultOpen={group.defaultOpen}
            className="group/collapsible rounded-sm bg-background text-app-header-foreground"
          >
            <SidebarGroup>
              <SidebarGroupLabel asChild className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <CollapsibleTrigger className="hover:bg-primary/50">
                  {group.title} <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link href={item.url}>
                            <item.icon />
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
