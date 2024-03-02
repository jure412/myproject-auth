"use client";

import { createShoppingListStatusCompleted } from "@/app/ServerActions/shoppingList.actions";
import { NotificationType } from "@/enums";
import { Role } from "@prisma/client";
import { FC, useContext, useState } from "react";
import Loading from "../Loading/Loading";
import { ModalContext } from "../Modal/Modal";
import { NotificationContext } from "../Notifications/Notifications";

interface StatusUpdateProps {
  id: number;
  status: Role;
}

const StatusUpdate: FC<StatusUpdateProps> = ({ id, status }) => {
  const notifications = useContext(NotificationContext);
  const modal = useContext(ModalContext);

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("shoppingListId", id.toString());
    const res = await createShoppingListStatusCompleted(formData);
    if (res.success) {
      const responseUpdate = [
        {
          type: NotificationType.SUCCESS,
          message: "Shopping list updated!",
        },
      ];
      notifications?.setNotifications(responseUpdate);
      modal?.setModal(null);
    } else {
      notifications?.setNotifications(res.error!);
    }
    setIsLoading(false);
  };
  return (
    <span>
      {isLoading ? (
        <Loading />
      ) : (
        <span>
          {status == Role.ACTIVE ? (
            <div onClick={handleSubmit}>
              <span>mark as </span>
              <span style={{ color: "red", cursor: "pointer" }}>COMPLETED</span>
            </div>
          ) : (
            <div>
              <span>marked as </span>
              <span style={{ color: "green", cursor: "pointer" }}>
                COMPLETED
              </span>
            </div>
          )}
        </span>
      )}
    </span>
  );
};

export default StatusUpdate;
