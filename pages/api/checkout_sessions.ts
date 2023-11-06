import config from "../../app/config";
import { HTTP_REQUEST_METHOD, HTTP_RESPONSE_STATUS } from "../../app/config/constant";
import { resErrorJson } from "../../app/utils";
import { NextApiRequest, NextApiResponse } from "next";
import stripe from "stripe";
const stripeInit = new stripe(config.STRIPE_SECRET_KEY || "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case HTTP_REQUEST_METHOD.POST:
      try {
        // Create Checkout Sessions from body params.
        const session = await stripeInit.checkout.sessions.create({
          ui_mode: "embedded",
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: "pr_123",
              quantity: 1,
            },
          ],
          mode: "payment",
          return_url: `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        res.status(HTTP_RESPONSE_STATUS.OK).json({clientSecret: session.client_secret});
      } catch (error: any) {
        res.status(HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json(resErrorJson(error.toString()));
      }
      break;
    case HTTP_REQUEST_METHOD.GET:
      try {
        const session = await stripeInit.checkout.sessions.retrieve(req.query["session_id"]?.toString() || "");

        res.status(HTTP_RESPONSE_STATUS.OK).json({
          status: session.status,
          customer_email: session.customer_details?.email
        });
      } catch (error: any) {
        res.status(HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json(resErrorJson(error.toString()));
      }
      break;
    default:
      res.setHeader("Allow", req.method || "");
      res.status(HTTP_RESPONSE_STATUS.METHOD_NOT_ALLOWED).end("Method Not Allowed");
  }
}