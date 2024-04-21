"use client";

import dynamic from "next/dynamic";

const GraphViz = dynamic(
  () => import("graphviz-react").then((mod) => mod.Graphviz),
  { ssr: false }
);

export function GraphVizClient({ mindMap }: { mindMap: string }) {
  return <GraphViz className="graphviz w-full h-fit" dot={mindMap} />;
}
