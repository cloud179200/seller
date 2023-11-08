import React from "react";
import MinimalLayout from "./MinimalLayoutClient";

function Component({ children }: { children?: React.ReactNode }) {
  return (
      <MinimalLayout>
        {children}
      </MinimalLayout>
  );
}

export default Component;