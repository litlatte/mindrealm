import { Questions } from "@/components/questions";
import { prisma } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export type DocumentQuestionsPageProps = {
  params: {
    id: string;
  };
};

export default async function DocumentQuestionsPage({
  params,
}: DocumentQuestionsPageProps) {
  const questions = await prisma.question.findMany({
    where: {
      documentId: params.id,
      options: {
        every: {
          Answer: {
            every: {
              OR: [{ ignored: true }, { correct: false }],
            },
          },
        },
      },
    },
    include: {
      options: true,
    },
  });
  return (
    <div>
      <Link
        href={`/d/${params.id}`}
        className="p-4 bg-white absolute left-12 top-12 rounded-full border border-black/10 w-fit h-fit"
        aria-label="Go back to document page"
      >
        <ArrowLeft className="w-8 h-8" />
      </Link>
      <Questions documentId={params.id} questions={questions} />
    </div>
  );
}
