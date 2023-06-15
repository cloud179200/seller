"use client"
import React from 'react'
import MinimalLayout from '@/app/components/layout/MinimalLayout/MinimalLayoutClient';
export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <MinimalLayout>
        {children}
      </MinimalLayout>
    </>
  );
}
