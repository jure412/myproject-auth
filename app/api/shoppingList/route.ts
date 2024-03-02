import { prisma } from "@/app/prisma";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

interface ShoppingListProps {
  id: number;
  name: string;
  status: Role; // Assuming these are the possible statuses
  userId: string;
  _count: {
    items: number;
  };
}

export async function GET() {
  const shoppingLists = await prisma.shoppingList.findMany({
    orderBy: { id: "desc" },
    include: {
      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  if (shoppingLists) {
    const activeLength = shoppingLists.filter(
      (item: ShoppingListProps) => item.status === Role.ACTIVE
    );
    return NextResponse.json({
      data: { shoppingLists, isActiveOpen: activeLength.length === 0 },
      success: true,
    });
  }

  return NextResponse.json({
    error: ["Error while querying data"],
    success: false,
  });
}
