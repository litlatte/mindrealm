import { prisma } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GraphVizClient } from "./graphviz";

type DocumentFlashCardsPageProps = {
  params: {
    id: string;
  };
};

export default async function DocumentFlashCardsPage({
  params,
}: DocumentFlashCardsPageProps) {
  const document = await prisma.document.findFirst({
    where: {
      id: params.id,
      deleted: false,
    },
    select: {
      mindMap: true,
      title: true,
    },
  });
  if (!document) return notFound();

  return (
    <div>
      <Link
        href={`/d/${params.id}`}
        className="p-4 bg-white absolute left-12 top-12 rounded-full border border-black/10 w-fit h-fit"
        aria-label="Go back to document page"
      >
        <ArrowLeft className="w-8 h-8" />
      </Link>
      {/* <FlashCards questions={questions} /> */}
      <div className="flex flex-col justify-center items-center h-screen w-screen flex-grow-0 flex-shrink-0">
        <h1 className="text-3xl font-semibold">
          Mind Map for {document.title}
        </h1>
        <GraphVizClient mindMap={document.mindMap} />
      </div>
    </div>
  );
}
