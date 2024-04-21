import {
  ArrowLeft,
  Brain,
  LayoutList,
  ListChecks,
  ListOrdered,
  ListTodo,
  FileText,
  Network,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { DeleteDocumentButton } from "@/components/deletedocument";
import { PRETTY_EXPERIENCES } from "@/utils/constants";

type DocumentPageProps = {
  params: {
    id: string;
  };
};
export default async function DocumentPage({ params }: DocumentPageProps) {
  const document = await prisma.document.findFirst({
    where: {
      id: params.id,
      deleted: false,
    },
    select: {
      title: true,
      experience: true,
      _count: {
        select: {
          questions: true,
          Flashcard: true,
        },
      },
    },
  });

  if (!document) return notFound();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Link
        href="/"
        className="p-4 bg-white absolute left-12 top-12 rounded-full border border-black/10 w-fit h-fit"
        aria-label="Go back to home page"
      >
        <ArrowLeft className="w-8 h-8" />
      </Link>
      <div className="relative bg-white flex gap-4 flex-col items-center rounded-3xl border border-black/10 px-6 py-8 w-[30rem] min-h-72">
        <DeleteDocumentButton id={params.id} />
        <div className="flex gap-1 select-none items-center justify-center text-lg font-semibold text-center px-3 py-1 bg-accent-secondary/10 rounded-lg">
          <FileText className="h-5 w-5" />
          {document.title}
        </div>
        <div className="flex-grow flex flex-wrap gap-2 items-center justfy-center w-fit">
          <Link
            href={`/d/${params.id}/questions`}
            className="group relative overflow-hidden w-48 h-48 bg-accent text-on-accent border rounded-3xl flex flex-col items-center justify-center"
          >
            <LayoutList className="transition duration-700 scale-75 absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 group-hover:scale-100 group-hover:translate-x-1/2  group-hover:translate-y-1/4 h-24 w-24" />
            <div className="h-24 w-24" />
            <div className="text-center">
              <p className="text-xl font-bold">Quiz</p>
              <p className="text-sm">{document._count.questions} available</p>
            </div>
          </Link>
          <Link
            href={`/d/${params.id}/flashcards`}
            className="group relative overflow-hidden w-48 h-48 bg-accent text-on-accent border rounded-3xl flex flex-col items-center justify-center"
          >
            <Brain className="transition duration-700 scale-75 absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 group-hover:scale-100  group-hover:translate-x-1/2  group-hover:translate-y-1/4  h-24 w-24" />
            <div className="h-24 w-24" />
            <div className="text-center">
              <p className="text-xl font-bold">Flash Cards</p>
              <p className="text-sm">{document._count.Flashcard} available</p>
            </div>
          </Link>
          <Link
            href={`/d/${params.id}/mindmap`}
            className="group relative overflow-hidden w-48 h-48 bg-accent text-on-accent border rounded-3xl flex flex-col items-center justify-center"
          >
            <Network className="transition duration-700 scale-75 absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 group-hover:scale-100  group-hover:translate-x-1/2  group-hover:translate-y-1/4  h-24 w-24" />
            <div className="h-24 w-24" />
            <div className="text-center">
              <p className="text-xl font-bold">MindMap</p>
            </div>
          </Link>
        </div>
        <div>
          This document was detected to be for{" "}
          {
            PRETTY_EXPERIENCES[
              document.experience as keyof typeof PRETTY_EXPERIENCES
            ]
          }
        </div>
      </div>
    </div>
  );
}
