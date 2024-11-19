'use client';

import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Separator } from '../ui/separator';

export function AppBreadcrumb() {
  const path = usePathname();

  const paths = path!.split('/').filter(Boolean);

  return (
    <>
      {paths.length > 0 && (
        <>
          <Separator orientation="vertical" className="h-8" />{' '}
          {/* Se necessário ajustar o comportamento do separador futuramente, adicionar possibilidade de customização no componente do breadcrumb */}
          <Breadcrumb id="app-breadcrumb">
            <BreadcrumbList className="h-full place-items-center text-foreground">
              {paths.length > 0 && (
                <React.Fragment key={'bc-fragment-home'}>
                  <BreadcrumbItem key={'bc-item-home'}>
                    <BreadcrumbLink asChild>
                      <Link href="/" className="font-bold">
                        <HomeIcon className="h-4 w-4" />
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className={'font-bold text-foreground'} key={'bc-separator-home'} />
                </React.Fragment>
              )}
              {paths.length > 3 && (
                <React.Fragment key={'bc-fragment-elipsis'}>
                  <BreadcrumbItem key={'bc-item-elipsis'}>
                    <BreadcrumbEllipsis key={'bc-elipsis'} />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator key={'bc-separator-elipsis'} />
                </React.Fragment>
              )}
              {paths.map((path, index) => {
                const isLast = index === paths.length - 1;
                const shouldShow = paths.length > 3 ? index + 1 >= paths.length - 2 : true;
                const href = '/' + paths.slice(0, index + 1).join('/');

                if (shouldShow) {
                  return (
                    <React.Fragment key={`bc-fragment-${path}${index}`}>
                      <BreadcrumbItem key={`bc-item-${path}${index}`}>
                        <BreadcrumbLink asChild>
                          <Link className="font-semibold" href={href}>
                            {path}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator key={`bc-separator-${path}${index}`} />}
                    </React.Fragment>
                  );
                }
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </>
      )}
    </>
  );
}

{
  /* <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">ui</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>button.tsx</BreadcrumbPage>
        </BreadcrumbItem> */
}
