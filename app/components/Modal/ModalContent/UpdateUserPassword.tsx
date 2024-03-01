"use client";
import { UpdateUserPasswordAction } from "@/app/ServerActions/user.actions";
import { NotificationType } from "@/enums";
import { useSession } from "next-auth/react";
import { FormEvent, useContext, useState } from "react";
import styles from "../../../global.module.scss";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import { NotificationContext } from "../../Notifications/Notifications";
import { ModalContext } from "../Modal";

const UpdateUserPassword = () => {
  const notifications = useContext(NotificationContext);
  const modal = useContext(ModalContext);
  const { data } = useSession();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", data?.user.email);
    formData.append("password", form.password);
    formData.append("confirmPassword", form.confirmPassword);

    const res = await UpdateUserPasswordAction(formData);
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
      <div className={styles.col12}>
        <h1>Update user name</h1>
      </div>
      <div className={styles.col12}>
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.col12}>
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
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

export default UpdateUserPassword;
