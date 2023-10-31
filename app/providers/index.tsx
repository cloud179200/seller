"use client"
import React from "react";
import { store } from "@/app/redux/store";
import { Provider } from "react-redux";
import RouteHandler from "@/app/providers/RouteHandler";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";
import "@/app/assets/scss/style.scss";

function CustomProviders({
  children,
  session,
}: {
  children?: React.ReactNode;
  session?: Session | null;
}) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <div>
            <Toaster containerClassName="z-50" />
          </div>
          <RouteHandler>
            {children}
          </RouteHandler>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default CustomProviders;
