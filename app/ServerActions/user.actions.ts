"use server";

import { NotificationType } from "@/enums";
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
