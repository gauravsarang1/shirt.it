import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('max-w-[1024px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-24', className)}>
      {children}
    </div>
  );
}
