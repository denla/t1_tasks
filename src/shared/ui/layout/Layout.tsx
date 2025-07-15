import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full overflow-hidden bg-muted">
      <main className="flex-1 p-6 min-h-screen">
        <div className="bg-background shadow-sm border rounded-2xl p-6 max-w-[780px] mx-auto ">
          {children}
        </div>
      </main>
    </div>
  );
}
