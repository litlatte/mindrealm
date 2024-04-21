"use client";

import { cn } from "@/lib/utils";
import { animationDelayStyle } from "@/utils/methods";
import { FileText, Sparkle } from "lucide-react";
import dynamic from "next/dynamic";
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function UploadCard() {
  const [loading, setLoading] = useState(false);
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const file = e.target.files?.[0];
    if (!file) {
      return setLoading(false);
    }
    import("pdfjs-dist").then(async (pdfjsLib) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const buffer = Buffer.from(arrayBuffer);
        var pdf = pdfjsLib.getDocument(buffer);
        pdf.promise
          .then(async (pdf) => {
            let pdfText = "";
            try {
              for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                content.items.forEach((item) => {
                  if ((item as TextItem).str)
                    pdfText += (item as TextItem).str + " ";
                });
              }
              console.log("File parsed successfully!");
              return fetch("/api/v1/parse", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ pdfText }),
              })
                .then((r) => r.json())
                .then((data) => console.log(data))
                .catch((e) => {
                  console.error(e);
                  toast.error(
                    "An error occurred while parsing the file (E_API)"
                  );
                })
                .finally(() => setLoading(false));
            } catch (e) {
              console.error(e);
              console.error("An error occurred while reading the file (E1)");
              toast.error("An error occurred while reading the file (E0)");
            }
            setLoading(false);
          })
          .catch((e) => {
            console.error(e);
            toast.error("An error occurred while reading the file (E1)");
          });
      };

      reader.onerror = (e) => {
        console.error(e);
        setLoading(false);
        toast.error("An error occurred while reading the file (E2)");
      };

      reader.readAsArrayBuffer(file);
    });
  }
  return (
    <div
      className={cn(
        " p-[2px]",
        loading &&
          "bg-gradient-to-br from-accent via-orange-300 to-emerald-400  animate-gradient bg-[length:200%_200%] shadow-lg shadow-accent/30 rounded-3xl"
      )}
    >
      <div className="flex flex-col items-center justify-center relative h-72 w-full bg-white py-20 border-2 border-dashed border-black/10 z-10 rounded-3xl">
        {loading ? (
          <>
            <div className="relative w-48 h-32 shrink-0">
              <Sparkle className="animate-star stroke-accent absolute h-16 w-16 top-2 left-6" />
              <Sparkle
                style={{
                  ...animationDelayStyle(0.15),
                }}
                className="animate-star stroke-accent absolute h-12 w-12 bottom-0 left-8"
              />
              <Sparkle
                style={{
                  ...animationDelayStyle(0.3),
                }}
                className="animate-star stroke-accent absolute h-32 w-32 right-2 top-1/2 -translate-y-1/2"
              />
            </div>
            <p className="mt-10 font-bold text-lg">Generating...</p>
          </>
        ) : (
          <>
            <header>
              <FileText className="w-24 h-24 stroke-[1px] mx-auto" />
            </header>
            <label
              htmlFor="fileID"
              className="absolute w-full h-full top-0 left-0 cursor-pointer rounded-3xl active:outline outline-accent transition-outline duration-300"
            ></label>
            <input
              type="file"
              hidden
              accept=".pdf"
              id="fileID"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <p className="text-xl mt-6">Choose File</p>
            <div className="text-sm opacity-80">
              Upload a PDF with 2 pages or less
            </div>
          </>
        )}
      </div>
    </div>
  );
}
