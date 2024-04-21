import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  await prisma.document.update({
    where: {
      id: params.id,
    },
    data: {
      deleted: true,
    },
  });

  return new Response(
    JSON.stringify({
      success: true,
    }),
    {
      status: 200,
    }
  );
}
