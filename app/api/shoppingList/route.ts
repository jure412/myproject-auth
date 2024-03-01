import { prisma } from "@/app/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const shoppingLists = await prisma.shoppingList.findMany({
    orderBy: { id: "desc" },
    include: {
      _count: {
        select: {
          items: true, // Count associated items
        },
      },
    },
  });

  if (shoppingLists) {
    return NextResponse.json({
      data: shoppingLists,
      success: true,
    });
  }

  return NextResponse.json({
    error: ["Error while querying data"],
    success: false,
  });
}
