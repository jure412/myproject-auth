import { prisma } from "@/app/prisma";
import { NextResponse } from "next/server";

interface GetProps {
  params: {
    id: number;
  };
}

export async function GET(request: Request, { params: { id } }: GetProps) {
  if (id) {
    const data = await prisma.shoppingList.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        items: {
          orderBy: { id: "desc" },
        },
      },
    });
    if (data) {
      return NextResponse.json({
        data: data,
        success: true,
      });
    }
  }

  return NextResponse.json({
    error: ["Error while querying data"],
    success: true,
  });
}
