"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useGetPackageDetails } from "../../hooks/usegetsinglepackage";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { Menuitemdetail } from "../../../reusable/menuitemdetail/menuitemdetail";



export default function ViewPackageItemsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  
  const { data, isPending } = useGetPackageDetails(id);

  if (isPending) return <div className="p-6">Loading...</div>;
  if (!data) return <div className="p-6">No data</div>;

  return (
    <div className="p-6 space-y-6">
      <UniButton
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back
      </UniButton>

      <Menuitemdetail items={data.items} />
    </div>
  );
}