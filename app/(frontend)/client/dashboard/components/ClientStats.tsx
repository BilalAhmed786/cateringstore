"use client";

import {
  ShoppingBag,
  Clock,
  Star,
  Utensils,
} from "lucide-react";

import { useGetClientDashboardStats } from "../hooks/useGetClientDashboardStats";
import ContentSkeleton from "@/app/(frontend)/components/reusables/skeleton/ContentSkeleton";
import { Card, CardContent } from "@/app/(frontend)/components/ui/card";



export default function ClientStats() {
  const { data, isLoading } = useGetClientDashboardStats();

  const stats = [
    {
      label: "Total Orders",
      value: data?.totalOrders ?? 0,
      icon: ShoppingBag,
    },
    {
      label: "Active Orders",
      value: data?.activeOrders ?? 0,
      icon: Clock,
    },
    {
      label: "My Reviews",
      value: data?.myReviews ?? 0,
      icon: Star,
    },
    {
      label: "Tasting Requests",
      value: data?.tastingRequests ?? 0,
      icon: Utensils,
    },
  ];

  if (isLoading) {
    return <ContentSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className="transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}