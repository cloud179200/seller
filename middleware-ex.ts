/* eslint-disable no-console */
import { withAuth } from "next-auth/middleware"
import appConfig from "@/app/config"
export default withAuth(
  (req) => {
    console.log({ req })
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // console.log({ token })
        return Boolean(token)
      },
    },
    secret: appConfig.SECRET
  }
)

export const config = {
  matcher: ['/dashboard/:path*'],
};