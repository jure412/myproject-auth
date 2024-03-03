import { prisma } from "@/app/prisma";
import { NotificationType } from "@/enums";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface GetProps {
  params: {
    id: number;
  };
}
const ShoppingListValidate = z.object({
  id: z.string().min(1, "Item doesn't exists"),
});
export async function GET(
  request: NextApiRequest,
  { params: { id } }: GetProps
) {
  const validationRes = await ShoppingListValidate.safeParseAsync({
    id,
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

  return NextResponse.json({
    error: ["Error while querying data"],
    success: true,
  });
}

function compareArrays(arr1: {}[], arr2: {}[], propertyName: string) {
  const matchingValues: string[] = [];

  // Create a Set of values from arr2 for quicker lookups
  const set = new Set(arr2.map((obj: any) => obj[propertyName]));

  // Iterate over arr1 and check if each element's propertyName exists in arr2
  arr1.forEach((obj: any) => {
    if (set.has(obj[propertyName])) {
      matchingValues.push(obj[propertyName]);
    }
  });

  return matchingValues;
}
const importShoppingListValidation = z.object({
  id: z.string().min(1, "Shoipping list doesn't exists"),
  file: z.string().min(20, "file not provided"),
});
export async function POST(request: NextRequest, { params: { id } }: GetProps) {
  const token = await getToken({ req: request });
  const { file } = await request.json();

  const validationRes = await importShoppingListValidation.safeParseAsync({
    id,
    file,
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

  let base64String = "";
  if (file.includes(",")) {
    base64String = file.split(",")[1];
  } else {
    base64String = file;
  }

  const decodedData = atob(base64String);
  const jsonData = JSON.parse(decodedData);
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
    let matchingNames = compareArrays(data?.items!, jsonData, "name");
    if (matchingNames.length === 0) {
      const d = jsonData.map((item: any) => ({
        ...item,
        shoppingListId: Number(id),
        userId: token?.id,
      }));

      const createManyItems = await prisma.item.createMany({ data: d });
      return NextResponse.json({
        data: createManyItems,
        success: true,
      });
    }
    const error = matchingNames.map((matchingName: any) => ({
      type: NotificationType.DANGER,
      message: `Json file includes marching element ${matchingName}`,
    }));
    return NextResponse.json({
      error: error,
      success: false,
    });
  }
  return NextResponse.json({
    error: [
      {
        type: NotificationType.DANGER,
        message: "No shopping list found with this id",
      },
    ],
    success: false,
  });
}
