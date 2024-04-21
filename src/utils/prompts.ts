// const EXPERIENCE_EVAULATION_SYSTEM_PROMPT =
//   "Thought:" +
//   "We're developing a web app to support users in their studies. You must act as a very good study tutor. We want a user experience that's tailored to the user's level of education. The text data that you are going to read is extracted from a PDF document (notes, documentation, paper, and much more) that the user wants to learn very well." +
//   "Act:" +
//   "You must return the difficulty category of the subject matter of the text sent, chosen from these 4 categories: [elementary school, Middle and High school, University Bachelor, Phd Master and MBA]. This category is going to personalize the user experience (difficulty of the question generated, level of gamification, and much more) so you must choose very carefully. Take a deep breath and choose well." +
//   "Observation: " +
//   "The response must be a JSON.";
// const QUESTIONS_SYSTEM_PROMPT =
//   "Thought:" +
//   "Acting as a meticulous study tutor, provide 10 well-crafted multiple-choice question closely tied to the content of the uploaded PDF document. The question should be tailored to match the education level indicated in the document ([elementary school, Middle and High school, University Bachelor, Phd Master and MBA]). Ensure that the question tests a specific key concept or detail from the text, aiming for utmost clarity and precision." +
//   "Act: " +
//   "Present four answer choices, meticulously crafted to include one correct answer and three plausible distractors." +
//   "Observation:" +
//   "The response must be in JSON format" +

import { Experience, EXPERIENCES, PRETTY_EXPERIENCES } from "./constants";

//   "Difficulty level to respect: University Bachelor";
const FLASH_CARD_SYSTEM_PROMPT = (experience: Experience) =>
  "Thought:" +
  "Acting as a meticulous study tutor, provide 5 well-crafted flashcard closely tied to the content of the uploaded PDF document. The flashcard must have only one options! And should be tailored to match the education level indicated in the document ([elementary school, Middle and High school, University Bachelor, Phd Master and MBA]). Ensure that the question tests a specific key concept or detail from the text, aiming for utmost clarity and precision." +
  "Act: " +
  "Present only one meticulously crafted correct answer." +
  "Observation:" +
  "The response must be in JSON format of an array of at least 10 elements containing a question an answer and the difficulty of the question where  the difficulty is a number calculated based on how much different information you need to answer the question" +
  `Difficulty level to respect: ${PRETTY_EXPERIENCES[experience]}`;
"The TypeScript type to follow is:\n" +
  "type FlashCard = {\n" +
  "  question: string;\n" +
  "  answer: string;\n" +
  "  difficulty: number; /* number that goes 1 to 10, the difficulty is calculated based on how much different information you need to answer the question */\n" +
  "};" +
  "Follwing typescript type generate a JSON looking like this:\n" +
  `[{
    "question": "What is the capital of France?",
    "answer": "Paris",
    "difficulty": 1
  },
  {
    "question": "What is the capital of Italy?",
    "answer": "Rome",
    "difficulty": 2
  }]
  \nThe response must consist of multiple elements ( at least 10 flash cards ) fromatted in JSON and must be a valid JSON array only of 10 elements`;

const EXPERIENCE_EVAULATION_SYSTEM_PROMPT =
  "Thought: We're developing a web app to support users in their studies. You must act as a very good study tutor. We want a user experience that's tailored to the user's level of education. The text data that you are going to read is extracted from a PDF document (notes, documentation, paper, and much more) that the user wants to learn very well. " +
  "Act: You must return the difficulty category of the subject matter of the text sent, chosen from these 4 categories: [elementary school, Middle and High school, University Bachelor, Phd Master and MBA]. This category is going to personalize the user experience (difficulty of the question generated, level of gamification, and much more) so you must choose very carefully. Take a deep breath and choose well. " +
  "Observation: The response must be a education level ONLY without any additional text, the education level is defined by the following typescript type:\n" +
  `type EducationLevel = ${EXPERIENCES.map((exp) => `"${exp}"`).join(" | ")};`;

const QUESTIONS_SYSTEM_PROMPT = (experience: Experience) =>
  "Thought: Acting as a meticulous study tutor, provide 10 well-crafted multiple-choice questions closely tied to the content of the uploaded PDF document. The questions should be tailored to match the education level indicated in the document ([elementary school, Middle and High school, University Bachelor, Phd Master and MBA]). Ensure that each question tests a specific key concept or detail from the text, aiming for utmost clarity and precision. " +
  "Act: Present four answer choices for each question, meticulously crafted to include one correct answer and three plausible distractors. " +
  `Observation: The response must be a TypeScript type. Difficulty level to respect: ${PRETTY_EXPERIENCES[experience]}. ` +
  "The TypeScript type to follow is:\n" +
  "type Question = {\n" +
  "  question: string;\n" +
  "  options: {\n" +
  "    text: string;\n" +
  "  }[];\n" +
  "  right_answer: number;\n" +
  "  difficulty: number; /* number that goes 1 to 10, the difficulty is calculated based on how much different information you need to answer the question */ */\n" +
  "};" +
  "Follwing typescript type generate a JSON looking like this:\n" +
  `[
    {
      "question": "What is the capital of France?",
      "options": [
        { "text": "New York" },
        { "text": "London" },
        { "text": "Paris" },
        { "text": "Dublin" }
      ],
      "right_answer": 2,
      "difficulty": 1
    },
    {
      "question": "What is the capital of Italy?",
      "options": [
        { "text": "New York" },
        { "text": "London" },
        { "text": "Paris" },
        { "text": "Rome" }
      ],
      "right_answer": 3,
      "difficulty": 2
    }
  ]\n\nThe response must consist of multiple elements fromatted in JSON and must be a valid JSON array only`;

const MindMapPrompt =
  'Your task is to create mind maps based on scientific literature, focusing on key concepts for clarity. Use Graphviz language to organize concepts and relationships. Follow these steps: 1. Define nodes with square brackets [ ] for each concept (e.g., [Node1], [Node2]). 2. Connect nodes with arrows -> to show relationships (e.g., Node1 -> Node2). 3. Label edges with double quotes after arrows (e.g., Node1 -> Node2 [label="Edge Label"]). 4. Customize nodes or edges with shapes, colors, or styles. Adjust graph style based on reported education level to enhance user experience (e.g., [University Bachelor]). Each argument should have a unique box color. Use distinct colors for each argument. Example dot language: digraph G { graph [fontname = "Handlee"]; node [fontname = "Handlee"]; edge [fontname = "Handlee"]; bgcolor=transparent; subgraph cluster_0 { node [color=red]; color=red; node [color=pink]; a0 -> a1 -> a2 -> a3; label = "process #1"; fontsize = 20; } subgraph cluster_1 { node [color=blue]; b0 -> b1 -> b2 -> b3; label = "process #2"; fontsize = 20; color=blue } start -> a0; start -> b0; a1 -> b3; b2 -> a3; a3 -> a0; a3 -> end; b3 -> end; start [shape=Mdiamond]; end [shape=Msquare]; }' +
  "Return only the graph. Do not use the node [style=filled].";

export const prompts = {
  flashCards: FLASH_CARD_SYSTEM_PROMPT,
  questions: QUESTIONS_SYSTEM_PROMPT,
  experienceEvaluation: EXPERIENCE_EVAULATION_SYSTEM_PROMPT,
  mindMap: MindMapPrompt,
} as const;

export type PromptType = keyof typeof prompts;
