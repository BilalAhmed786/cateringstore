"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { Menuitemdetail } from "../../../reusable/menuitemdetail/menuitemdetail";
import { useGetHamperDetails } from "../../hooks/usegetsinglehamper";

export default function ViewHamperItemsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isPending } = useGetHamperDetails(id);

  if (isPending) return <div className="p-6">Loading...</div>;
  if (!data) return <div className="p-6">No data</div>;

  return (
    <div className="p-6 space-y-6">
      <UniButton variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowLeft size={16} /> Back
      </UniButton>

      <Menuitemdetail items={data.items} />
    </div>
  );
}