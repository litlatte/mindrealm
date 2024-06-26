import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindRealm",
  description: "The ultimate learning experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
        <svg
          width="309"
          height="351"
          viewBox="0 0 309 351"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-8 right-8 w-24 h-24"
        >
          <path
            d="M206 90.0207L257.5 111.412V57.2198L206 85.742L206 90.0207Z"
            fill="#16A34A"
          />
          <path
            d="M257.5 145.638V188.422L206 167.031L206 124.247L257.5 145.638Z"
            fill="#16A34A"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 85.7419L0 265.433L154.5 351L154.5 0.175354L103 28.6974L103 85.7419V90.0207L51.5001 111.412L51.5001 57.2196L0 85.7419ZM51.5 188.422L51.5 145.638L103 124.247V167.031L51.5 188.422Z"
            fill="#16A34A"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M154.5 0.175354L154.5 351L309 265.433V85.742L257.5 57.2198V111.412L206 90.0207L206 85.742L206 28.6976L154.5 0.175354ZM257.5 188.422V145.638L206 124.247L206 167.031L257.5 188.422Z"
            fill="#4ADE80"
          />
          <path
            d="M51.5 145.638L51.5 188.422L103 167.031V124.247L51.5 145.638Z"
            fill="#4ADE80"
          />
          <path
            d="M51.5001 111.412L103 90.0207V85.7419L51.5001 57.2196L51.5001 111.412Z"
            fill="#4ADE80"
          />
        </svg>
      </body>
    </html>
  );
}
