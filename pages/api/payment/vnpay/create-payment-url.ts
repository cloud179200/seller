import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { resErrorJson, resSuccessJson } from "@/app/utils";
import { API_MESSAGE, HTTP_REQUEST_METHOD, HTTP_RESPONSE_STATUS } from "@/app/config/constant";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === HTTP_REQUEST_METHOD.POST) {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        res.status(HTTP_RESPONSE_STATUS.UNAUTHORIZED).json(resErrorJson("unauthorized"));
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email || ""
        }
      });

      if (!user) {
        throw new Error("not found user");
      }
      
      res.status(HTTP_RESPONSE_STATUS.OK).json(resSuccessJson("Success", ));
    } catch (error: any) {
      res.status(HTTP_RESPONSE_STATUS.METHOD_NOT_ALLOWED).json(resErrorJson(error.toString()));
    }
  } else {
    res.status(HTTP_RESPONSE_STATUS.METHOD_NOT_ALLOWED).json(resErrorJson("method not allowed"));
  }
}