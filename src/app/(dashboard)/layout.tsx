import { Settings } from "lucide-react";

export type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="flex  w-screen  h-screen bg-gradient-to-b  from-slate-100 to-white overflow-hidden">
      {/* <div className="flex z-10 flex-col items-center py-4 px-20 gap-4 h-screen w-[28rem] bg-white border-r border-black/10">
        <div className="w-fit text-xl mt-6 font-bold">Hey Alessandro!</div>
        <div className="flex gap-4 items-center justify-center w-full text-xl font-bold px-6 py-3 rounded-2xl border border-black/10">
          <Settings />
          Settings
        </div>
      </div> */}
      {children}
    </main>
  );
}
