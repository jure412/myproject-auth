"use server";

import { NotificationType } from "@/enums";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../prisma";

const updateUserNameSchema = z.object({
  email: z
    .string()
    .min(1, "This field has to be filled.")
    .email("This is not a valid email.")
    .refine(async (email: string) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    }, "Email not found"),
  name: z.string().min(3, "name should be minimum 3 characters"),
});

export const UpdateUserNameAction = async (formData: FormData) => {
  const email = formData.get("email");
  const name = formData.get("name");

  const validationRes = await updateUserNameSchema.safeParseAsync({
    email,
    name,
  });
  if (!validationRes.success) {
    const validationErrors = validationRes.error.errors.map(
      ({ message }: { message: string }) => ({
        message,
        type: NotificationType.DANGER,
      })
    );
    return { error: validationErrors, success: false };
  }

  const newUser = await prisma.user.update({
    where: {
      email: email as string,
    },
    data: {
      name: name as string,
    },
  });

  return {
    data: newUser,
    success: true,
    message: "Successfully updated",
  };
};

const updateUserPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "This field has to be filled.")
      .email("This is not a valid email.")
      .refine(async (email: string) => {
        const user = await prisma.user.findUnique({
          where: { email },
        });
        return user;
      }, "Email not found"),
    password: z.string().min(8, "Password should be minimum 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password should be minimum 8 characters"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export const UpdateUserPasswordAction = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const validationRes = await updateUserPasswordSchema.safeParseAsync({
    email,
    password,
    confirmPassword,
  });
  if (!validationRes.success) {
    const validationErrors = validationRes.error.errors.map(
      ({ message }: { message: string }) => ({
        message,
        type: NotificationType.DANGER,
      })
    );
    return { error: validationErrors, success: false };
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const { password: pass, ...newUser } = await prisma.user.update({
    where: {
      email: email as string,
    },
    data: {
      password: hashedPassword as any,
    },
  });

  return {
    data: newUser,
    success: true,
    message: "Successfully updated",
  };
};
