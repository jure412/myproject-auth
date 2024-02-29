"use client";
import { NotificationType } from "@/enums";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SignIn = () => {
  const { push } = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    push("/");
  };

  const handleGithubSubmit = async () => {
    await signIn("github", { callbackUrl: "/" });
  };
  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <div>
          <button onClick={() => handleSubmit}>Click</button>
        </div>
        <div>
          <button onClick={handleGithubSubmit}>Continue with GitHub</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
