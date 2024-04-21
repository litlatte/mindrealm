"use client";
import { Flashcard, Option, Question } from "@prisma/client";
import { LoaderCircle, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { FlippableCard } from "./flippablecard";

export function FlashCards({
  flashcards: baseFlashCards,
  documentId,
}: {
  documentId: string;
  flashcards: Flashcard[];
}) {
  // shuffledQuestions
  const flashcards = useMemo(() => {
    return baseFlashCards.sort(() => Math.random() - 0.5);
  }, [baseFlashCards]);

  const [viewing, setViewing] = useState(0);

  const flashcard = useMemo(() => flashcards[viewing], [viewing, flashcards]);

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  /*
  const handleNext = useCallback(() => {
    if (selected) {
      setLoading(true);
      fetch(`/api/v1/questions/${flashcard.id}/answer`, {
        method: "POST",
        body: JSON.stringify({
          optionId: selected,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.correct) {
            toast.success("Correct Answer");
            setSelected(null);
            setViewing((prev) => prev + 1);
          } else {
            toast.error("Incorrect Answer");
          }
        })
        .catch((e) => {
          console.error(e);
          toast.error("An error occurred");
        })
        .finally(() => setLoading(false));
      //   if (question.options.find((option) => option.id === selected)?.correct) {
      //     toast.success("Correct Answer");
      //   } else {
      //     toast.error("Incorrect Answer");
      //   }
      // setViewing((prev) => prev + 1);
    } else {
      toast.error("Please select an answer");
    }
  }, [selected, question]);*/

  const handleSkip = useCallback(() => {
    //setSelected(null);
    setViewing((prev) => prev + 1);
  }, []);

  const handleRestart = useCallback(() => {
    setViewing(0);
  }, []);

  /*const handleRestart = useCallback(() => {
    fetch(`/api/v1/documents/${documentId}/resetquestions`, {
      method: "POST",
    })
      .then((r) => {
        if (r.ok) {
          router.push(`/d/${documentId}`);
        } else {
          toast.error("An error occurred");
        }
      })
      .catch((e) => {
        console.error(e);
        toast.error("An error occurred");
      });
  }, [router]);*/

  const handleNext = useCallback(() => {
    setViewing((prev) => prev + 1);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-screen h-full items-center justify-center">
      <div className="h-fit w-fit">
        {flashcard !== undefined ? (
          <>
            <p className="mb-4 text-center text-xl font-bold">
              Flashcard {viewing + 1} of {flashcards.length}
            </p>
            <FlippableCard flashcard={flashcard} />
            <div className="flex justify-end items-center w-full px-4 mt-2 gap-2">
              <button onClick={handleSkip} className="px-3">
                Skip
              </button>
              <button
                className="px-4 py-2 font-bold bg-accent hover:opacity-80 transition druation-300 text-on-accent rounded-xl"
                onClick={handleNext}
                disabled={loading}
              >
                {loading ? <LoaderCircle className=" animate-spin" /> : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-2xl font-semibold flex flex-col items-center">
            <p>No more questions</p>
            {flashcards.length && (
              <button
                onClick={handleRestart}
                className="bg-accent mt-4 hover:opacity-90 group flex items-center justify-center gap-2 text-on-accent px-4 py-2 rounded-xl"
              >
                <RefreshCcw className=" transition duration-300 group-hover:rotate-180" />
                Restart
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
