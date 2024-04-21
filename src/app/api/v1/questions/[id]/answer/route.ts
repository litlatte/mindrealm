import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const questionId = params.id;

  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!question) {
    return new Response(
      JSON.stringify({
        error: "Question not found",
      }),
      { status: 404 }
    );
  }

  const body = await req.json();
  const optionId = body.optionId;

  const option = await prisma.option.findUnique({
    where: {
      questionId: questionId,
      id: optionId,
    },
  });

  if (!option) {
    return new Response(
      JSON.stringify({
        error: "Option not found",
      }),
      { status: 404 }
    );
  }

  const correct = option.correct;

  await prisma.answer.create({
    data: {
      questionId: questionId,
      optionId: optionId,
    },
  });

  return new Response(
    JSON.stringify({
      correct,
    }),
    { status: 200 }
  );
}
