"use client";
import { NotificationType } from "@/enums";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import Button from "../components/Button/Button";
import GithubButton from "../components/Button/Variants/GithubButton";
import FileInput from "../components/FileInput/FileInput";
import Input from "../components/Input/Input";
import { NotificationContext } from "../components/Notifications/Notifications";
import style from "../global.module.scss";
import { convertImageToBase64 } from "../helpers";

interface formProps {
  email: string;
  password: string;
  image: null | File;
}

const Register = () => {
  const notifications = useContext(NotificationContext);
  const { push } = useRouter();

  const [form, setForm] = useState<formProps>({
    email: "",
    password: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setForm({
        email: "",
        password: "",
        image: null,
      });
      setIsLoading(false);
    };
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let base64Image = "";
    if (form.image) {
      base64Image = await convertImageToBase64(form.image);
    }

    const payload = {
      email: form.email,
      password: form.password,
      image: base64Image,
    };

    // here goes FE validation

    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!data?.error) {
      const responseRegister = [
        {
          type: NotificationType.SUCCESS,
          message: "Registered successfully!",
        },
      ];
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      const responseLogin = result?.error
        ? JSON.parse(result?.error)
        : [
            {
              type: NotificationType.SUCCESS,
              message: "Login successfully!",
            },
          ];

      notifications?.setNotifications([...responseRegister, ...responseLogin]);
      setIsLoading(false);
      !result?.error && push("/");
    } else {
      notifications?.setNotifications(data?.error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const file = files[0];
      setForm({
        ...form,
        image: file,
      });
    }
  };

  return (
    <div className={style.row}>
      <div className={style.col}>
        <h1>Register</h1>
        <form className={style.row}>
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
          <div className={`${style.col12} justify-content: flex-end;`}>
            <FileInput onChange={handleFileChange} />
          </div>
          <div className={style.col12}>
            <Button onClick={handleSubmit} isLoading={isLoading}>
              Click
            </Button>
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

export default Register;
