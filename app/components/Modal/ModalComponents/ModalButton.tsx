"use client";
import { ModalType } from "@/enums";
import { FC, ReactNode, useContext } from "react";
import Button from "../../Button/Button";
import { ModalContext } from "../Modal";

const ModalButton: FC<{ modalType: ModalType; children: ReactNode }> = ({
  modalType,
  children,
}) => {
  const modal = useContext(ModalContext);

  return <Button onClick={() => modal?.setModal(modalType)}>{children}</Button>;
};

export default ModalButton;
