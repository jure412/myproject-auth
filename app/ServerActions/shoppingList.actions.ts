"use server";

import { NotificationType } from "@/enums";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "../prisma";

const validateShoppingList = z.object({
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

  const validationRes = await validateShoppingList.safeParseAsync({
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

  revalidatePath("/");

  return {
    data: shoppingList,
    success: true,
  };
};

const validateShoppingListStatus = z.object({
  shoppingListId: z.string().refine(async (shoppingListId: string) => {
    const shoppingList = await prisma.shoppingList.findUnique({
      where: { id: Number(shoppingListId) },
    });
    return shoppingList;
  }, "Shopping List not found"),
});

export const createShoppingListStatusCompleted = async (formData: FormData) => {
  const shoppingListId = formData.get("shoppingListId");

  const validationRes = await validateShoppingListStatus.safeParseAsync({
    shoppingListId,
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

  const shoppingList = await prisma.shoppingList.update({
    where: {
      id: Number(shoppingListId), // Assuming `shoppingListId` is the ID field
    },
    data: {
      status: Role.COMPLETED,
    },
  });
  revalidatePath("/");
  revalidatePath("/shoppingList");

  return {
    data: shoppingList,
    success: true,
  };
};

const validateShoppingListItem = z.object({
  userId: z
    .string()
    .min(1, "User doesn't exists")
    .refine(async (userId: string) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      return user;
    }, "User not found"),
  shoppingListId: z
    .string()
    .min(1, "Shopping list doesn't exists")
    .refine(async (shoppingListId: string) => {
      const shoppingList = await prisma.shoppingList.findUnique({
        where: { id: Number(shoppingListId) },
      });
      return shoppingList;
    }, "Shopping list not found"),
  name: z.string().min(1, "Name should be minimum 1 characters"),
});

export const createShoppingListItem = async (formData: FormData) => {
  const name = formData.get("name");
  const userId = formData.get("userId");
  const shoppingListId = formData.get("shoppingListId");

  const validationRes = await validateShoppingListItem.safeParseAsync({
    shoppingListId,
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

  const item = await prisma.item.create({
    data: {
      name: String(name),
      userId: String(userId),
      shoppingListId: Number(shoppingListId),
    },
  });

  revalidatePath("/shoppingList");
  revalidatePath("/shoppingList/" + shoppingListId);

  return {
    data: item,
    success: true,
  };
};

const RoleTypeZod = z.nativeEnum(Role);
const validateShoppingListItemCompleted = z.object({
  id: z
    .string()
    .min(1, "Shopping list doesn't exists")
    .refine(async (id: string) => {
      const shoppingList = await prisma.shoppingList.findUnique({
        where: { id: Number(id) },
      });
      return shoppingList;
    }, "Shopping list  not found"),
  status: RoleTypeZod,
});

export const createShoppingListItemCompleted = async (formData: FormData) => {
  const id = formData.get("id");
  const status = formData.get("status");

  const validationRes = await validateShoppingListItemCompleted.safeParseAsync({
    id,
    status,
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

  const item = await prisma.item.update({
    where: {
      id: Number(id), // Assuming `shoppingListId` is the ID field
    },
    data: {
      status: status as Role,
    },
  });

  revalidatePath("/");

  return {
    data: item,
    success: true,
  };
};
