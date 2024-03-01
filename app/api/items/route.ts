import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const data = await prisma.item.findMany({
      where: {
        shoppingListId: Number(id),
      },
      orderBy: { id: "desc" },
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
    success: false,
  });
}
