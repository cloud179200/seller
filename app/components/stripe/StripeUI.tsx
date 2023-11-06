"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import config from "@/app/config";
import { API_MESSAGE, HTTP_REQUEST_METHOD, HTTP_RESPONSE_STATUS } from "@/app/config/constant";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import tickIOS from "@/app/assets/lottie/tick-ios.json";
import { IResponseErrorObject } from "@/app/utils/interface";

const stripePromise = loadStripe(
  config.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const StripeUI = () => {
  const [clientSecret, setClientSecret] = useState("");

  const handleCheckout =async () => {
    const result = await fetch("/api/checkout_sessions", {
      method: HTTP_REQUEST_METHOD.POST,
    });
    if(result.status === HTTP_RESPONSE_STATUS.OK){
      const resJson = await result.json();
      setClientSecret(resJson.clientSecret);
      toast(API_MESSAGE.UPDATE_SUCCESS, {
        className: "toast-success font-medium",
        icon: <Lottie className="h-8 w-8" animationData={tickIOS} initialSegment={[14, 28]} />,
        duration: 1500
      });
      return;
    }
    const resJson: IResponseErrorObject = (await result.json()) as unknown as IResponseErrorObject;
    toast.error(resJson.message || API_MESSAGE.UPDATE_FAIL, { className: "toast-error"});
  };

  useEffect(() => {
    handleCheckout();
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export default StripeUI;
