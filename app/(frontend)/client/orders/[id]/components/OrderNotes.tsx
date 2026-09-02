"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/app/(frontend)/components/ui/card";
import { FileText } from "lucide-react";


interface OrderNotesProps {
  notes: string;
}

export default function OrderNotes({ notes }: OrderNotesProps) {
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4" />
          Notes
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {notes}
        </p>
      </CardContent>
    </Card>
  );
}