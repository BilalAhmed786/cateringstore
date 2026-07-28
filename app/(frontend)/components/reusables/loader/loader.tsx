import { cn } from "@/app/(frontend)/utils";
import { Loader2 } from "lucide-react";


interface LoaderProps {
  variant?: "fullscreen" | "page" | "inline";
  size?: number;
  className?: string;
}

export function Loader({
  variant = "inline",
  size = 24,
  className,
}: LoaderProps) {
  const variants = {
    fullscreen: "fixed inset-0 z-50 flex items-center justify-center",
    page: "flex h-full min-h-[300px] w-full items-center justify-center",
    inline: "flex items-center justify-center py-6",
  };

  return (
    <div className={cn(variants[variant], className)}>
      <Loader2
        className="animate-spin text-muted-foreground"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
}