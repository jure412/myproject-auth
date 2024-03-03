"use client";
import {
  createShoppingListItemCompleted,
  deleteShoppingListItem,
} from "@/app/ServerActions/shoppingList.actions";
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
  const [isLoadingCheck, setIsLoadingCheck] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const notifications = useContext(NotificationContext);
  const modal = useContext(ModalContext);
  const handleCheckboxChange = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLoadingCheck(true);
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
    setIsLoadingCheck(false);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsLoadingDelete(true);
    const formData = new FormData();
    formData.append("id", item.id.toString());
    formData.append("shoppingListId", item.shoppingListId.toString());
    const res = await deleteShoppingListItem(formData);
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
    setIsLoadingDelete(false);
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
      <span className={`${styles.mr2}`}>
        {isLoadingDelete ? (
          <Loading />
        ) : (
          <p onClick={handleDelete} className={`${styles.pSmall}`}>
            <span className={`${styles.cDanger}`}>Delete</span>
          </p>
        )}
      </span>
      <span style={{ width: "30px" }}>
        {isLoadingCheck ? (
          <Loading />
        ) : (
          <input
            type="checkbox"
            readOnly
            checked={item.status !== Role.ACTIVE}
          />
        )}
      </span>
    </div>
  );
};

export default ItemCheck;
