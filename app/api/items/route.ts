import { prisma } from "@/app/prisma";
import { NotificationType } from "@/enums";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const exportShoppingListValidation = z.object({
  id: z.string().min(1, "Shopping list doesn't exists."),
  token: z.string().min(20, "Unauthorize user."),
});

export async function GET(request: NextRequest, response: NextResponse) {
  const id = request.nextUrl.searchParams.get("id");
  const type = request.nextUrl.searchParams.get("type");
  const token = await getToken({ req: request, raw: true });

  const validationRes = await exportShoppingListValidation.safeParseAsync({
    id,
    token,
  });

  if (!validationRes.success) {
    const validationErrors = validationRes.error.errors.map(
      ({ message }: { message: string }) => ({
        message,
        type: NotificationType.DANGER,
      })
    );
    return NextResponse.json({
      error: validationErrors,
      success: false,
    });
  }

  const data = await prisma.item.findMany({
    where: {
      shoppingListId: Number(id),
    },
    orderBy: { id: "desc" },
  });
  if (data) {
    if (type === "json") {
      const jsonString = JSON.stringify(data, null, 2);
      const response = new NextResponse(jsonString);
      response.headers.set(
        "Content-disposition",
        "attachment; filename=data.json"
      );
      response.headers.set("Authorization", `Bearer ${token}`);

      return response;
    }
    return NextResponse.json({
      data: data,
      success: true,
    });
  }

  return NextResponse.json({
    error: ["Error while querying data"],
    success: false,
  });
}
