import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { prompts, type PromptType } from "@/utils/prompts";
import { EXPERIENCES_REGEX, EXPERIENCES, Experience } from "@/utils/constants";
import { prisma } from "@/lib/db";

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
  if(typeof title !== "string" || title.length === 0) {
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
  let questions: any | undefined = undefined;
  while (maxErrors > 0 && !questions) {
    let oQuestions =
      (await generateOpenAIResponse(
        openai,
        prompts.questions(experience as Experience),
        pdfText
      )) || undefined;
    console.log(`Questions: ${oQuestions}`);
    try {
      questions = JSON.parse(oQuestions || "");
      questions = questions?.questions || questions;̂
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

//   const document = prisma

  return new Response(
    JSON.stringify({
      experience,
      questions,
    }),
    { status: 200 }
  );
}
