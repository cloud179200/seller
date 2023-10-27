import React from 'react'
import MainLayout from './MainLayout'

function Component({ children }: { children?: React.ReactNode }) {
  return (
      <MainLayout>
        {children}
      </MainLayout>
  )
}

export default Component