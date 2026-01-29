'use client'
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

interface UniButtonProps extends React.ComponentProps<typeof Button> {
  label?: string;
  loading?: boolean;
  loadingLabel?: string;
  icon?: React.ReactNode;
}

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
