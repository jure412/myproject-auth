"use client";
import { createShoppingListItemCompleted } from "@/app/ServerActions/shoppingList.actions";
import { NotificationType } from "@/enums";
import { Item, Role } from "@prisma/client";
import { FC, useContext, useState } from "react";
import styles from "../../global.module.scss";
import Loading from "../Loading/Loading";
import { ModalContext } from "../Modal/Modal";
import { NotificationContext } from "../Notifications/Notifications";

interface StatusUpdateProps {
  item: Item;
}

const ItemCheck: FC<StatusUpdateProps> = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const notifications = useContext(NotificationContext);
  const modal = useContext(ModalContext);
  const handleCheckboxChange = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", item.id.toString());
    formData.append(
      "status",
      item.status === Role.ACTIVE ? Role.COMPLETED : Role.ACTIVE
    );
    const res = await createShoppingListItemCompleted(formData);
    if (res.success) {
      const responseUpdate = [
        {
          type: NotificationType.SUCCESS,
          message: "List updated!",
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
    <div
      onClick={handleCheckboxChange}
      className={`${styles.col12} ${styles.action_box}`}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <p className={`${styles.pXLarge} ${styles.mrAuto}`}>{item.name}</p>
      {isLoading ? (
        <Loading />
      ) : (
        <input type="checkbox" readOnly checked={item.status !== Role.ACTIVE} />
      )}
    </div>
  );
};

export default ItemCheck;
