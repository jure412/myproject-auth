"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface formProps {
  email: string;
  password: string;
  image: null | File;
}

const Register = () => {
  const { push } = useRouter();

  const [form, setForm] = useState<formProps>({
    email: "",
    password: "",
    image: null,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      email: form.email,
      password: form.password,
    };

    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    push("/signin");
  };

  return (
    <div>
      <h1>Register</h1>
      <form>
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
          <button type="button" onClick={handleSubmit}>
            Click
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
