import Link from "next/link";
import {
  ShoppingBag,
  Utensils,
  
} from "lucide-react";

const actions = [
  {
    title: "Browse Menu",
    description: "Explore our catering menu",
    href: "/menuitem",
    icon: ShoppingBag,
  },
  {
    title: "Request a Tasting",
    description: "Try our food before your event",
    href: "/contactus",
    icon: Utensils,
  },
  
];

export default function QuickActions() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">
        What would you like to do?
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-2xl border bg-background p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="font-semibold">
                {action.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}