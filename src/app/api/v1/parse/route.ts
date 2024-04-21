import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { prompts, type PromptType } from "@/utils/prompts";
import {
  EXPERIENCES_REGEX,
  EXPERIENCES,
  Experience,
  LLMQuestion,
  LLMFlashCard,
} from "@/utils/constants";
import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function generateOpenAIResponse(
  openai: OpenAI,
  systemPrompt: string,
  pdfText: string
) {
  const pdfMessage: OpenAI.Chat.ChatCompletionMessageParam = {
    role: "user",
    content: pdfText,
  };
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];
  messages.push({
    role: "system",
    content: systemPrompt,
  });
  messages.push(pdfMessage);

  const oaiResponse = openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });
  return oaiResponse.then((response) => {
    return response.choices[0].message.content;
  });
}

export async function POST(req: Request) {
  //   // Ask OpenAI for a streaming chat completion given the prompt
  //   const response = await openai.chat.completions.create({
  //     model: "gpt-3.5-turbo",
  //     stream: true,
  //     messages,
  //   });
  //   // wait for streaming completion
  //   const stream = OpenAIStream(response);

  const body = await req.json();

  const pdfText = body.pdfText;

  if (typeof pdfText !== "string" || pdfText.length === 0) {
    return new Response(
      JSON.stringify({
        error: "Invalid PDF text",
      }),
      { status: 400 }
    );
  }

  const title = body.title;
  if (typeof title !== "string" || title.length === 0) {
    return new Response(
      JSON.stringify({
        error: "Invalid title",
      }),
      { status: 400 }
    );
  }

  //   const jsonResponse = {
  //     flashCards: await generateOpenAIResponse(
  //       openai,
  //       prompts.flashCards,
  //       pdfText
  //     ),
  //     questions: await generateOpenAIResponse(openai, prompts.questions, pdfText),
  //     experienceEvaluation: await generateOpenAIResponse(
  //       openai,
  //       prompts.experienceEvaluation,
  //       pdfText
  //     ),
  //   };

  let maxErrors = 4;
  let oExperience: string | undefined = undefined;
  let exp: string | undefined = undefined;
  while (maxErrors > 0 && !exp) {
    oExperience =
      (await generateOpenAIResponse(
        openai,
        prompts.experienceEvaluation,
        pdfText
      )) || undefined;
    exp = EXPERIENCES.find((exp) => exp === oExperience?.toLocaleLowerCase());
    if (!exp) {
      const matches = oExperience
        ?.toLocaleLowerCase()
        ?.matchAll(new RegExp(EXPERIENCES_REGEX, "gi"));

      console.log(oExperience);
      const allMatches = [];
      let match = matches?.next();
      while (match && !match.done) {
        allMatches.push(match?.value?.[0]?.toLocaleLowerCase());
        match = matches?.next();
      }
      if (allMatches.length === 1) {
        exp = allMatches[0];
      }
    }
    if (!exp) {
      maxErrors--;
      console.warn(
        `Could not generate valid experience: generated ${oExperience}`
      );
    }
  }
  const experience = exp;

  if (typeof experience !== "string") {
    console.error(
      `Could not generate valid experience: last generated ${oExperience}`
    );
    return new Response(
      JSON.stringify({
        error: `Could not generate experience`,
      }),
      { status: 500 }
    );
  }
  console.log(`Experience: ${experience}`);
  let flashCards: LLMFlashCard[] | undefined = undefined;
  while (maxErrors > 0 && !flashCards) {
    let oFlashCards =
      (await generateOpenAIResponse(
        openai,
        prompts.flashCards(experience as Experience),
        pdfText
      )) || undefined;
    console.log(`Flash Cards: ${oFlashCards}`);
    try {
      flashCards = JSON.parse(
        oFlashCards?.replaceAll("```json", "")?.replaceAll("```", "") || ""
      );
      flashCards = ((flashCards as any)?.flashCards ||
        (flashCards as any).flashcards ||
        flashCards) as LLMFlashCard[];
    } catch (e) {
      console.error(`Invalid JSON response: `, e);
    }
    if (!flashCards) {
      maxErrors--;
      console.warn(
        `Could not generate valid questions: generated ${oFlashCards}`
      );
    }
  }
  if (!flashCards) {
    return new Response(
      JSON.stringify({
        error: `Could not generate questions`,
      }),
      { status: 500 }
    );
  }

  let questions: LLMQuestion[] | undefined = undefined;
  while (maxErrors > 0 && !questions) {
    let oQuestions =
      (await generateOpenAIResponse(
        openai,
        prompts.questions(experience as Experience),
        pdfText
      )) || undefined;
    console.log(`Flash Cards: ${oQuestions}`);
    try {
      questions = JSON.parse(
        oQuestions?.replaceAll("```json", "")?.replaceAll("```", "") || ""
      );
      questions = ((questions as any)?.questions || questions) as LLMQuestion[];
    } catch (e) {
      console.error(`Invalid JSON response: `, e);
    }
    if (!questions) {
      maxErrors--;
      console.warn(
        `Could not generate valid questions: generated ${oQuestions}`
      );
    }
  }
  if (!questions) {
    return new Response(
      JSON.stringify({
        error: `Could not generate questions`,
      }),
      { status: 500 }
    );
  }

  const document = await prisma.document.create({
    data: {
      title,
      experience,
      fullText: pdfText,
    },
  });

  const promises: Promise<Prisma.BatchPayload>[] = [];
  for (const question of questions) {
    promises.push(
      new Promise(async (resolve, reject) => {
        const q = await prisma.question.create({
          data: {
            documentId: document.id,
            title: question.question,
            difficulty: question.difficulty,
          },
        });
        prisma.option
          .createMany({
            data: question.options.map((option, index) => ({
              questionId: q.id,
              text: option.text,
              correct: index == question.right_answer,
            })),
          })
          .then(resolve)
          .catch(reject);
      })
    );
  }
  await Promise.all(promises);

  let flashCardsArr = flashCards;

  if (!Array.isArray(flashCardsArr)) {
    flashCardsArr = Object.values(flashCardsArr);
  }

  await prisma.flashcard.createMany({
    data: flashCardsArr.map((flashCard) => ({
      documentId: document.id,
      question: flashCard.question,
      answer: flashCard.answer,
      difficulty: flashCard.difficulty,
    })),
  });

  return new Response(
    JSON.stringify({
      documentId: document.id,
    }),
    { status: 200 }
  );
}
