"use client";
import { NotificationType } from "@/enums";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import Button from "../components/Button/Button";
import GithubButton from "../components/Button/Variants/GithubButton";
import Input from "../components/Input/Input";
import { NotificationContext } from "../components/Notifications/Notifications";
import style from "../global.module.scss";

const SignIn = () => {
  const notifications = useContext(NotificationContext);
  const { push } = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // here goes FE validation
    const result = await signIn("credentials", {
      ...form,
      redirect: false,
    });
    const response = result?.error
      ? JSON.parse(result?.error)
      : [
          {
            type: NotificationType.SUCCESS,
            message: "Login successfully!",
          },
        ];
    notifications?.setNotifications(response);
    setIsLoading(false);
    !result?.error && push("/");
  };

  return (
    <div className={style.row}>
      <div className={style.col}>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit} className={style.row}>
          <div className={`${style.col12} ${style.colXl6}`}>
            <Input
              label="Email"
              name="email"
              type="text"
              value={form.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${style.col12} ${style.colXl6}`}>
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.col12}>
            <Button isLoading={isLoading}>Click</Button>
          </div>
        </form>
        <div className={style.row}>
          <div className={style.col12}>
            <GithubButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
