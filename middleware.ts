import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_API_ROUTE } from "./app/config/router";
import { resErrorJson } from "./app/utils";
import { NextApiRequest } from "next";
import { HTTP_RESPONSE_STATUS } from "./app/config/constant";
import { getToken } from "next-auth/jwt";
import cf from "./app/config";

export async function middleware(req: NextApiRequest | NextRequest) {
  if (req instanceof NextRequest) {
    const res = NextResponse.next();
    return res;
  }

  const reqUrl = req.url || "";
  if (PROTECTED_API_ROUTE.some(item => reqUrl.includes(item.path))) {
    
    const token = await getToken({
      req,
      secret: cf.SECRET,
    });

    if (!token?.email) {
      const res = NextResponse;
      res.json(resErrorJson, { status: HTTP_RESPONSE_STATUS.UNAUTHORIZED });
      return res;
    }
  }

  const res = NextResponse.next();
  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/api/:path*"],
};