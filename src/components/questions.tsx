"use client";
import { Option, Question } from "@prisma/client";
import { LoaderCircle, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

export function Questions({
  questions: baseQuestions,
  documentId,
}: {
  documentId: string;
  questions: (Question & {
    options: Option[];
  })[];
}) {
  // shuffledQuestions
  const questions = useMemo(() => {
    return baseQuestions
      .map((question) => {
        const options = question.options.sort(() => Math.random() - 0.5);
        return {
          ...question,
          options,
        };
      })
      .sort(() => Math.random() - 0.5);
  }, [baseQuestions]);

  const [viewing, setViewing] = useState(0);

  const question = useMemo(() => questions[viewing], [viewing, questions]);

  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleNext = useCallback(() => {
    if (selected) {
      setLoading(true);
      fetch(`/api/v1/questions/${question.id}/answer`, {
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
  }, [selected, question]);

  const handleSkip = useCallback(() => {
    setSelected(null);
    setViewing((prev) => prev + 1);
  }, []);

  const handleRestart = useCallback(() => {
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
  }, [router]);

  return (
    <div className="flex flex-col gap-4 w-screen h-full items-center justify-center">
      <div className="h-fit w-fit">
        {question !== undefined ? (
          <>
            <div
              key={question.id}
              className=" bg-white relative rounded-3xl py-8 px-12 border border-accent-secondary/20 flex flex-col gap-2"
            >
              <div className="text-lg font-semibold">{question.title}</div>
              <div className="bg-accent-secondary/20 w-fit rounded-lg p-2">
                Difficulty: {question.difficulty}
              </div>
              <div
                className="flex flex-col gap-2"
                onChange={(e) => setSelected((e.target as any).value)}
              >
                {question.options.map((option) => (
                  <div key={option.id} className="flex gap-2 items-center">
                    <input
                      type="radio"
                      id={option.id}
                      name={question.id}
                      value={option.id}
                    />
                    <label className="select-none" htmlFor={option.id}>
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
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
            <button
              onClick={handleRestart}
              className="bg-accent mt-4 hover:opacity-90 group flex items-center justify-center gap-2 text-on-accent px-4 py-2 rounded-xl"
            >
              <RefreshCcw className=" transition duration-300 group-hover:rotate-180" />
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
