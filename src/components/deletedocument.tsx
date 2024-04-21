"use client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export type DeleteDocumentProps = {
  id: string;
};

export function DeleteDocumentButton({ id }: DeleteDocumentProps) {
  const router = useRouter();
  const deleteQuestion = useCallback(async () => {
    await fetch(`/api/v1/documents/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.error(e);
        toast.error("An error occurred");
      });
  }, [id, router]);

  return (
    <button
      onClick={deleteQuestion}
      className="absolute top-4 right-4 p-4 rounded-full"
    >
      <Trash className="w-8 h-8" />
    </button>
  );
}
