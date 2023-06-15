import React from 'react'
import MainLayout from './MainLayoutClient'

function Component({ children }: { children?: React.ReactNode }) {
  return (
      <MainLayout>
        {children}
      </MainLayout>
  )
}

export default Component