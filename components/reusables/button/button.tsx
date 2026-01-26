"use client"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

interface UniButtonProps
  extends React.ComponentProps<typeof Button> {
  label?: string;
  loading?: boolean;
  loadingLabel?: string;
}

export function UniButton({
  label,
  loading = false,
  loadingLabel = "Please wait...",
  disabled,
  children,
  ...props
}: UniButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
    >
      {loading && <Loader2 className="animate-spin" />}
      {loading ? loadingLabel : label ?? children}
    </Button>
  );
}