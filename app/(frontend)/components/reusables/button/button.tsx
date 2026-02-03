'use client'
import { Button } from "@/app/(frontend)/components/ui/button";
import { Loader2 } from "lucide-react";
import { UniButtonProps } from "../types/types";

export function UniButton({
  label,
  loading = false,
  loadingLabel = "Please wait...",
  disabled,
  children,
  icon, 
  ...props
}: UniButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-2 ${props.className}`} // keep flex styling for icon + label
    >
      {loading && <Loader2 className="animate-spin" />}
      {!loading && icon} {/* render icon if not loading */}
      {loading ? loadingLabel : label ?? children}
    </Button>
  );
}
