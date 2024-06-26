import { UploadCard } from "@/components/UploadCard";
import { animationDelayStyle } from "@/utils/methods";
import { ArrowLeft, File, FileText } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <Link
        href="/"
        className="p-4 bg-white absolute left-12 top-12 rounded-full border border-black/10 w-fit h-fit"
        aria-label="Go back to home page"
      >
        <ArrowLeft className="w-8 h-8" />
      </Link>
      <h1 className="text-center text-5xl mt-48">Upload Document</h1>
      <div className="flex mt-16 w-full items-center justify-center">
        <div className="relative text-center h-fit w-[36rem]">
          <FileText
            style={{
              ...animationDelayStyle(0),
            }}
            className="animate-files-icon-appear opacity-0 absolute w-32 h-32 -translate-x-[150%] -translate-y-[150%] -rotate-[30deg]"
          />
          <FileText
            style={{
              ...animationDelayStyle(0.05),
            }}
            className="animate-files-icon-appear opacity-0 absolute w-44 h-44 -translate-x-[300%] -translate-y-[150%] -rotate-[30deg]"
          />
          <FileText
            style={{
              ...animationDelayStyle(0.1),
            }}
            className="animate-files-icon-appear right-0 opacity-0 absolute w-24 h-24 translate-x-[120%] -translate-y-[150%] rotate-[30deg]"
          />
          <FileText
            style={{
              ...animationDelayStyle(0.15),
            }}
            className="animate-files-icon-appear right-0 opacity-0 absolute w-36 h-36 translate-x-[300%] -translate-y-[200%] rotate-[45deg]"
          />
          <UploadCard />
        </div>
      </div>
    </div>
  );
}

// input[type="file"] {
//   display: none;
// }

// .custom-file-upload {
//   border: 1px solid #ccc;
//   display: inline-block;
//   padding: 6px 12px;
//   cursor: pointer;
// }
