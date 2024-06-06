"use client";
import { useState } from "react";

export default function Home() {
  const [isTraditional, setIsTraditional] = useState(true);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="bg-slate-800 w-full rounded-lg min-h-screen min-h-full">
        <div className="flex min-h-10 bg-slate-700 rounded-lg header items-center justify-center text-lg">
          {isTraditional ? "Traditional Blockchain" : "ERC4337"}
        </div>
      </div>
    </main>
  );
}
