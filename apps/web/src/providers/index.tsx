import React from "react";
import ReduxProvider from "./redux-provider";


export default function RootProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <React.Fragment>
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </React.Fragment>
  );
};
