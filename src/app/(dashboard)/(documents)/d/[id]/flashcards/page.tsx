import { FlashCards } from "@/components/flashcards";
import { FlippableCard } from "@/components/flippablecard";
import { prisma } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type DocumentFlashCardsPageProps = {
  params: {
    id: string;
  };
};

export default async function DocumentFlashCardsPage({
  params,
}: DocumentFlashCardsPageProps) {
  const flashcards = await prisma.flashcard.findMany({
    where: {
      documentId: params.id,
      document: {
        deleted: false,
      },
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
      {/* <FlashCards questions={questions} /> */}
      <div className="flex justify-center items-center h-screen w-screen">
        <FlashCards flashcards={flashcards} documentId={params.id} />
      </div>
    </div>
  );
}
