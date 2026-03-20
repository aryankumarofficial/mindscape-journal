import React from "react";
import ReduxProvider from "./redux-provider";
import ToastProvider from "./toast-provider";


export default function RootProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <React.Fragment>
      <ReduxProvider>
        <ToastProvider/>
        {children}
      </ReduxProvider>
    </React.Fragment>
  );
};
