"use client";
import React, { useEffect, useState } from "react";
import Animate from "@/app/components/extended/Animate";
import {
  STATUS_VERIFY_EMAIL,
  NAME_TRANS_EN,
  HTTP_RESPONSE_STATUS,
} from "@/app/config/constant";
import EmailSentPNG from "@/public/images/email-sent.png";
import EmailSuccessPNG from "@/public/images/email-success.png";
import EmailFailedPNG from "@/public/images/error.png";
import Link from "next/link";
import LoadingComponent from "@/app/components/Loading";
import { useSearchParams } from "next/navigation";

function Verify() {
  const searchParams = useSearchParams();
  const emailVerifyToken = searchParams?.get("emailVerifyToken") || "";

  const [statusContent, setStatusContent] = useState<{
    image: any;
    content: React.ReactNode | string;
  }>({
    image: EmailSentPNG,
    content: NAME_TRANS_EN.CHECK_EMAIL_FOR_VERIFY,
  });
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    if (!emailVerifyToken) {
      setLoading(false);
      return;
    }
    const res = await fetch(`/api/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailVerifyToken }),
    });
    setLoading(false);
    switch (res.status) {
      case HTTP_RESPONSE_STATUS.OK:
        setStatusContent({
          image: EmailSuccessPNG,
          content: NAME_TRANS_EN.VERIFY_EMAIL_SUCCESS,
        });
        break;
      case HTTP_RESPONSE_STATUS.SERVER_ERROR:
        setStatusContent({
          image: EmailFailedPNG,
          content: (
            <>
              {NAME_TRANS_EN.VERIFY_EMAIL_FAILED}.<br /> Please Connect Email
              Support:{" "}
              <Link href="mailto:tehe@gmail.com">tehe@gmail.com</Link>.
            </>
          ),
        });
        break;
      default:
        setStatusContent({
          image: EmailSentPNG,
          content: NAME_TRANS_EN.CHECK_EMAIL_FOR_VERIFY,
        });
        break;
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex min-h-screen flex-wrap flex-col items-center justify-center">
      <img src={statusContent.image.src} width="20%" alt="status" />
      <h3 className="mb-2 text-center font-bold text-black">
        {statusContent.content}
      </h3>
      {statusContent.content !== STATUS_VERIFY_EMAIL.SENT && (
        <Animate>
          <Link
            className="w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-blue-700 focus:shadow-lg focus:outline-none"
            type="button"
            href="/auth/login"
          >
            {NAME_TRANS_EN.BACK_HOME_PAGE}
          </Link>
        </Animate>
      )}
    </div>
  );
}

export default Verify;
