"use server";

import { NotificationType } from "@/enums";
import { z } from "zod";
import { prisma } from "../prisma";

const updateShoppingList = z.object({
  userId: z
    .string()
    .min(1, "User doesn't exists")
    .refine(async (userId: string) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      return user;
    }, "Email not found"),
  name: z.string().min(1, "Name should be minimum 1 characters"),
});

export const createShoppingList = async (formData: FormData) => {
  const name = formData.get("name");
  const userId = formData.get("userId");

  const validationRes = await updateShoppingList.safeParseAsync({
    name,
    userId,
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

  const shoppingList = await prisma.shoppingList.create({
    data: {
      name: String(name),
      userId: String(userId),
    },
  });

  // revalidatePath("/");

  return {
    data: shoppingList,
    success: true,
  };
};
