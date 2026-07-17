"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/(frontend)/components/ui/tabs";
import { useGetSingleEvent } from "../../hooks/usegetsingleevent";
import { Menuitemdetail } from "../../../../components/reusables/menuitemdetail/menuitemdetail";
import { Packagedetail } from "../../../../components/reusables/packagedetail/packagedetail";


export default function ViewEventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isPending } = useGetSingleEvent(id);

  if (isPending) return <div className="p-6">Loading...</div>;
  if (!data) return <div className="p-6">No data</div>;

  return (
    <div className="p-6 space-y-6">
      <UniButton variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowLeft size={16} />
        Back
      </UniButton>

      <Tabs defaultValue="menu-items">
        <TabsList>
          <TabsTrigger value="menu-items">
            Menu Items ({data.menuItems.length})
          </TabsTrigger>

          <TabsTrigger value="packages">
            Packages ({data.packages.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="menu-items" className="mt-6">
          <Menuitemdetail items={data.menuItems} />
        </TabsContent>

        <TabsContent value="packages" className="mt-6">
          <Packagedetail packages={data.packages} />
        </TabsContent>
      </Tabs>
    </div>
  );
}