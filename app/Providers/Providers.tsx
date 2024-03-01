"use client";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import Modal from "../components/Modal/Modal";
import Notifications from "../components/Notifications/Notifications";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Notifications>
        <Modal>{children}</Modal>
      </Notifications>
    </SessionProvider>
  );
};
export default Providers;
