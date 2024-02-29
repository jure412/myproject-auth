"use client";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import Notifications from "../components/Notifications/Notifications";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Notifications>{children}</Notifications>
    </SessionProvider>
  );
};
export default Providers;
