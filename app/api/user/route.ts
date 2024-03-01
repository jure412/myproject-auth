import { NotificationType } from "@/enums";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveBase64ImageToFile } from "../helpers";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const registerUserSchema = z
  .object({
    email: z
      .string()
      .min(1, "This field has to be filled.")
      .email("This is not a valid email.")
      .refine(async (email: string) => {
        const user = await prisma.user.findUnique({
          where: { email },
        });
        return !user;
      }, "Email already exists."),
    password: z.string().min(8, "Password should be minimum 8 characters"),
    image: z
      .string()
      .refine(
        (value) => /^data:image\/(png|jpeg|jpg|gif);base64,/.test(value),
        {
          message:
            "Invalid image format. Only PNG, JPEG, JPG, and GIF are supported.",
        }
      ),
  })
  .refine((value) => value.image.length <= MAX_FILE_SIZE, {
    message: `Image file size exceeds the maximum limit of ${MAX_FILE_SIZE} bytes.`,
  });

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { email, password, image } = data;

  const imagePath: string | null = image
    ? await saveBase64ImageToFile(image, email)
    : null;

  const validationRes = await registerUserSchema.safeParseAsync({
    email,
    password,
    image,
  });
  if (!validationRes.success) {
    const validationErrors = validationRes.error.errors.map(
      ({ message }: { message: string }) => ({
        message,
        type: NotificationType.DANGER,
      })
    );
    return NextResponse.json({ error: validationErrors, success: false });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      image: imagePath,
    },
  });

  return NextResponse.json({
    data: newUser,
    success: true,
    message: "Successfully Registered",
  });
}

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

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { email, name } = data;

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
    return NextResponse.json({ error: validationErrors, success: false });
  }

  const newUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      name: name,
    },
  });

  return NextResponse.json({
    data: newUser,
    success: true,
    message: "Successfully updated",
  });
}

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

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const { email, password, confirmPassword } = data;

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
    return NextResponse.json({ error: validationErrors, success: false });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const { password: pass, ...newUser } = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    data: newUser,
    success: true,
    message: "Successfully updated",
  });
}
