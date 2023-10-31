import { NextRequest, NextResponse } from 'next/server';
import { PROTECTED_API_ROUTE } from './app/config/router'
import { getSession } from 'next-auth/react';
import { resErrorJson } from './app/utils';
import { NextApiRequest } from 'next';
import { HTTP_RESPONSE_STATUS } from './app/config/constant';

export async function middleware(req: NextApiRequest | NextRequest) {
  if (req instanceof NextRequest) {
    console.log({ headers: Object.keys(req.headers) })
    const res = NextResponse.next()
    return res;
  }

  const reqUrl = req.url || "";
  if (PROTECTED_API_ROUTE.some(item => reqUrl.includes(item.path))) {

    const session = await getSession({ req });

    if (!session?.user?.email) {
      const res = NextResponse;
      res.json(resErrorJson, { status: HTTP_RESPONSE_STATUS.UNAUTHORIZED });
      return res
    }
  }

  const res = NextResponse.next()
  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', "/api/:path*"],
};