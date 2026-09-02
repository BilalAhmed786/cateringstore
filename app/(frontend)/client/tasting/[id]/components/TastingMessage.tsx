import { Card, CardHeader, CardTitle, CardContent } from "@/app/(frontend)/components/ui/card";
import { MessageSquare } from "lucide-react";



interface TastingMessageProps {
  message: string | null;
}

export default function TastingMessage({
  message,
}: TastingMessageProps) {
  if (!message) return null;

  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageSquare className="h-5 w-5 text-primary" />
          Additional Message
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
          {message}
        </p>
      </CardContent>
    </Card>
  );
}