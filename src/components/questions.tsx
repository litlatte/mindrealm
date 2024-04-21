"use client";
import { Option, Question } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

export function Questions({
  questions: baseQuestions,
}: {
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

  const handleNext = useCallback(() => {
    if (selected) {
      fetch(`/api/v1/question/${question.id}/answer`, {
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
        });
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

  return (
    <div className="flex flex-col gap-4 w-screen h-full items-center justify-center">
      <div
        key={question.id}
        className=" bg-white rounded-3xl py-8 px-12 border border-accent-secondary/20 flex flex-col gap-2"
      >
        <div className="text-lg font-semibold">{question.title}</div>
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
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
