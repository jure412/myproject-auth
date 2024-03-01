"use client";
import { createShoppingList } from "@/app/ServerActions/shoppingList.actions";
import { NotificationType } from "@/enums";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import styles from "../../../global.module.scss";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import { NotificationContext } from "../../Notifications/Notifications";
import { ModalContext } from "../Modal";

const CreateNewShoppingList = () => {
  const { data: session } = useSession();
  const notifications = useContext(NotificationContext);
  const modal = useContext(ModalContext);
  const { data } = useSession();
  const [name, setName] = useState(data?.user.name);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (_: string, value: string) => {
    setName(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("userId", session?.user.id);
    const res = await createShoppingList(formData);
    if (res.success) {
      const responseUpdate = [
        {
          type: NotificationType.SUCCESS,
          message: "User updated!",
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
    <form onSubmit={handleSubmit} className={styles.row}>
      <>
        <div className={styles.col12}>
          <h1>Create new shopping list</h1>
        </div>
        <div className={styles.col12}>
          <Input
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.col12}>
          <Button type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </>
    </form>
  );
};

export default CreateNewShoppingList;
