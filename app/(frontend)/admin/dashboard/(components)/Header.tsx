"use client";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { Home} from "lucide-react";
import { useRouter } from "next/navigation";
import { HeaderProps } from "../types/types";

export default function Header({
  title = "Welcome Admin",
 }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 w-full bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between items-center backdrop-blur-sm z-10">
      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <div className="flex items-center gap-3">
        <UniButton
          onClick={() => router.push("/")}
          variant="outline"
          size="sm"
          icon={<Home size={16} />}
          label="Home"
        />
      </div>
    </div>
  );
}