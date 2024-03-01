"use client";
import { UpdateUserNameAction } from "@/app/ServerActions/user.actions";
import { NotificationType } from "@/enums";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import styles from "../../../global.module.scss";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import { NotificationContext } from "../../Notifications/Notifications";
import { ModalContext } from "../Modal";

const UpdateUserName = () => {
  const notifications = useContext(NotificationContext);
  const router = useRouter();
  const modal = useContext(ModalContext);
  const { data, update } = useSession();
  const [name, setName] = useState(data?.user.name);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (_: string, value: string) => {
    setName(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", data?.user.email);
    const res = await UpdateUserNameAction(formData);
    if (res.success) {
      await update({ ...data, user: { ...data?.user, name: name } });
      const responseUpdate = [
        {
          type: NotificationType.SUCCESS,
          message: "User updated!",
        },
      ];
      notifications?.setNotifications(responseUpdate);
      modal?.setModal(null);
      router.refresh();
    } else {
      notifications?.setNotifications(res.error!);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.row}>
      <div className={styles.col12}>
        <h1>Update user name</h1>
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
    </form>
  );
};

export default UpdateUserName;
