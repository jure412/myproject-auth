"use client";
import { ModalType } from "@/enums";
import { FC, ReactNode, createContext, useState } from "react";
import styles from "./Modal.module.scss";
import UpdateUserName from "./ModalContent/UpdateUserName";
import UpdateUserPassword from "./ModalContent/UpdateUserPassword";

export interface ModalContextValue {
  modal: ModalType | null;
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

const modalSelector = (name: ModalType) => {
  switch (name) {
    case ModalType.UPDATE_USER_NAME:
      return <UpdateUserName />;
    case ModalType.UPDATE_USER_PASSWORD:
      return <UpdateUserPassword />;
    default:
      break;
  }
};

const Modal: FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<ModalType | null>(null);

  const contextValue: any = {
    modal,
    setModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <div className={styles.modal}>
          <div className={styles.modalContainer}>
            <div
              className={styles.modalClose}
              onClick={() => {
                setModal(null);
              }}
            >
              Close
            </div>
            {modalSelector(modal)}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default Modal;
