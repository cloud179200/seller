import { NextRequest } from "next/server";
import querystring from "querystring";
import crypto from "crypto";
import moment from "moment";
import _ from "underscore";

interface VnpParams {
  vnp_Version: string;
  vnp_Command: string;
  vnp_TmnCode: string;
  vnp_Locale: string;
  vnp_CurrCode: string;
  vnp_TxnRef: string;
  vnp_OrderInfo: string;
  vnp_OrderType: string;
  vnp_Amount: number;
  vnp_ReturnUrl: string;
  vnp_IpAddr: string;
  vnp_CreateDate: string;
  vnp_BankCode?: string;
  vnp_SecureHash?: string;
}

export const VNPAY = {
  createPaymentURL: (req: NextRequest) => {
    const { headers, socket } = req;
    const ipAddr = headers.get("x-forwarded-for") || socket.remoteAddress;

    const tmnCode = config.get("vnp_TmnCode");
    const secretKey = config.get("vnp_HashSecret");
    let vnpUrl = config.get("vnp_Url");
    const returnUrl = config.get("vnp_ReturnUrl");

    const date = new Date();

    const createDate = moment(date).format("yyyymmddHHmmss");
    const orderId = moment(date).format("HHmmss");
    const amount = req.body.amount;
    const bankCode = req.body.bankCode;

    const orderInfo = req.body.orderDescription;
    const orderType = req.body.orderType;
    let locale = req.body.language;
    if (locale === null || locale === "") {
      locale = "vn";
    }
    const currCode = "VND";
    const signData = querystring.stringify({
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_BankCode: (bankCode !== null && bankCode !== "") ? bankCode : undefined,
      vnp_SecureHash: undefined
    });

    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    const vnpParams: VnpParams = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_SecureHash: signed
    };

    if (bankCode !== null && bankCode !== "") {
      vnpParams.vnp_BankCode = bankCode;
    }

    vnpUrl += "?" + querystring.stringify(_.object(_.keys(vnpParams).sort(), _.values(vnpParams)));

    return vnpUrl;
  }
};
