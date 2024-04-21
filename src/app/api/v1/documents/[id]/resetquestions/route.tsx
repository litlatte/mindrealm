import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const questionId = params.id;

  await prisma.answer.updateMany({
    where: {
      question: {
        documentId: questionId,
      },
    },
    data: {
      ignored: true,
    },
  });

  return new Response(
    JSON.stringify({
      success: true,
    }),
    { status: 200 }
  );
}
