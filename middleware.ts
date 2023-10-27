import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log({ headers: Object.keys(request.headers) })
  const response = NextResponse.next()
  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};