import Link from "next/link";
import { ShoppingBag, Utensils, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/(frontend)/components/ui/card";



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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          What would you like to do?
        </CardTitle>

        <CardDescription>
          Quickly access the most common actions
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-xl border p-5 transition-all hover:-translate-y-1 hover:bg-muted/40 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">
                    {action.title}
                  </h3>

                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}