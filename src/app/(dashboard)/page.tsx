import {
  ArrowRight,
  BookOpenIcon,
  BookText,
  Castle,
  FileIcon,
  Plus,
  Settings,
  Settings2,
  User,
} from "lucide-react";
import Link from "next/link";
import { animationDelayStyle } from "../../utils/methods";
import { Document } from "@prisma/client";
import { prisma } from "@/lib/db";

export type DocumentSection = {
  title: string;
  summary: string;
};

export type DocumentCardProps = {
  document: Document;
  index: number;
};

export function DocumentCard({ document, index }: DocumentCardProps) {
  return (
    <div className="relative bg-white p-6 rounded-3xl h-52 w-80 flex flex-col justify-between border border-black/10 overflow-hidden">
      <div className="text-2xl font-semibold">{document.title}</div>
      <div className="flex items-end justify-between h-fit">
        <Castle
          className="absolute rotate-12 -translate-x-1/3 translate-y-1/3 opacity-0 animate-file-book-appear"
          style={{
            ...animationDelayStyle(index * 0.05),
          }}
          size={120}
        />
        <div />
        <Link
          href={`/d/${document.id}`}
          className="text-xl group font-semibold border text-on-accent border-accent-secondary/50 flex items-center gap-1 transition duration-300 bg-accent hover:opacity-80 px-4 py-2 rounded-xl"
        >
          <div className=" pointer-events-none">Go</div>
          <ArrowRight className=" group-hover:scale-125 group-hover:translate-x-1  transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}

export default async function Home() {
  const documents = await prisma.document.findMany({
    where: {
      deleted: false,
    },
  });

  return (
    <div className="relative h-screen overrflow-hidden px-24 py-8 ">
      <div>
        <div className="flex  flex-wrap gap-4">
          {documents.map((document, i) => (
            <DocumentCard document={document} index={i} key={document.id} />
          ))}
          <Link
            href="/upload"
            className="group bg-white border-dashed p-6 rounded-3xl h-52 w-80 flex flex-col items-center justify-center border border-black/10 overflow-hidden"
          >
            <Plus className="h-24 w-24 opacity-80 trnasition duration-300 group-hover:opacity-100 group-hover:scale-110" />
          </Link>
        </div>
        <svg
          id="visual"
          viewBox="0 320 960 140"
          className="absolute opacity-30 bottom-0 left-0 w-screen h-fit"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <path
            d="M0 398L22.8 386.5C45.7 375 91.3 352 137 339.5C182.7 327 228.3 325 274 326.3C319.7 327.7 365.3 332.3 411.2 340.3C457 348.3 503 359.7 548.8 368.5C594.7 377.3 640.3 383.7 686 380.5C731.7 377.3 777.3 364.7 823 358.5C868.7 352.3 914.3 352.7 937.2 352.8L960 353L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
            fill="#4ade80"
          ></path>
          <path
            d="M0 385L22.8 387.5C45.7 390 91.3 395 137 401.2C182.7 407.3 228.3 414.7 274 411C319.7 407.3 365.3 392.7 411.2 393.3C457 394 503 410 548.8 414.2C594.7 418.3 640.3 410.7 686 401.7C731.7 392.7 777.3 382.3 823 375.7C868.7 369 914.3 366 937.2 364.5L960 363L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
            fill="#3fcf72"
          ></path>
          <path
            d="M0 412L22.8 418.7C45.7 425.3 91.3 438.7 137 444C182.7 449.3 228.3 446.7 274 437C319.7 427.3 365.3 410.7 411.2 405.7C457 400.7 503 407.3 548.8 407.8C594.7 408.3 640.3 402.7 686 399.3C731.7 396 777.3 395 823 404.2C868.7 413.3 914.3 432.7 937.2 442.3L960 452L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
            fill="#33c065"
          ></path>
          <path
            d="M0 460L22.8 461.2C45.7 462.3 91.3 464.7 137 464.3C182.7 464 228.3 461 274 463.5C319.7 466 365.3 474 411.2 474.7C457 475.3 503 468.7 548.8 462.8C594.7 457 640.3 452 686 447.8C731.7 443.7 777.3 440.3 823 442.8C868.7 445.3 914.3 453.7 937.2 457.8L960 462L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
            fill="#26b157"
          ></path>
          <path
            d="M0 489L22.8 488.2C45.7 487.3 91.3 485.7 137 486C182.7 486.3 228.3 488.7 274 493C319.7 497.3 365.3 503.7 411.2 504C457 504.3 503 498.7 548.8 498.7C594.7 498.7 640.3 504.3 686 503C731.7 501.7 777.3 493.3 823 493.3C868.7 493.3 914.3 501.7 937.2 505.8L960 510L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
            fill="#16a34a"
          ></path>
        </svg>
      </div>
    </div>
  );
}
