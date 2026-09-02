import { MessageSquare } from "lucide-react";

interface TastingMessageProps {
  message: string | null;
}

export default function TastingMessage({
  message,
}: TastingMessageProps) {
  if (!message) return null;

  return (
    <section className="rounded-2xl border bg-background shadow-sm">
      <div className="border-b px-5 py-4">
        <h2 className="flex items-center gap-2 font-semibold">
          <MessageSquare className="h-5 w-5 text-primary" />
          Additional Message
        </h2>
      </div>

      <div className="p-5">
        <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
          {message}
        </p>
      </div>
    </section>
  );
}
