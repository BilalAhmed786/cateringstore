import { Check } from "lucide-react";

type TastingSuccessProps = {
  name: string;
  eventType: string;
  guests: string;
  date: string;
  time: string;
};

export default function TastingSuccess({
  name,
  eventType,
  guests,
  date,
  time,
}: TastingSuccessProps) {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center p-6 text-center md:p-10">
      {/* Success Icon */}

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="h-10 w-10" />
      </div>

      {/* Heading */}

      <h3 className="mt-7 text-3xl font-bold">
        Tasting Request Received!
      </h3>

      <p className="mt-4 max-w-md leading-7 text-muted-foreground">
        Thank you, {name}. We&apos;ve received your tasting request.
        Our team will contact you to confirm your appointment.
      </p>

      {/* Summary */}

      <div className="mt-8 w-full max-w-md rounded-2xl bg-muted p-5 text-left">

        <div className="flex justify-between border-b pb-3">
          <span className="text-muted-foreground">
            Event
          </span>

          <span className="font-medium">
            {eventType}
          </span>
        </div>

        <div className="flex justify-between border-b py-3">
          <span className="text-muted-foreground">
            Guests
          </span>

          <span className="font-medium">
            {guests}
          </span>
        </div>

        <div className="flex justify-between border-b py-3">
          <span className="text-muted-foreground">
            Date
          </span>

          <span className="font-medium">
            {date}
          </span>
        </div>

        <div className="flex justify-between pt-3">
          <span className="text-muted-foreground">
            Time
          </span>

          <span className="font-medium">
            {time}
          </span>
        </div>

      </div>
    </div>
  );
}