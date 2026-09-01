"use client";

import { FileText } from "lucide-react";

interface OrderNotesProps {
  notes: string;
}

export default function OrderNotes({
  notes,
}: OrderNotesProps) {
  return (
    <div className="rounded-2xl border bg-background p-5 shadow-sm">
      <h2 className="flex items-center gap-2 font-semibold">
        <FileText className="h-4 w-4" />
        Notes
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        {notes}
      </p>
    </div>
  );
}