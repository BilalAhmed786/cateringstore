'use client'

import { Mail, MapPin, Phone } from "lucide-react";
import { useGetStoreSettings } from "@/app/(frontend)/admin/settings/store/hooks/useGetStoreSettings";
import { Loader } from "@/app/(frontend)/components/reusables/loader/loader";
export default function ContactMethods() {

  const {data} =useGetStoreSettings()
 
  if (!data)  return <Loader variant="page"/>
  return (
    
    <section className="border-b">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3">
          <ContactMethod
            icon={<Phone className="h-6 w-6" />}
            title="Call Us"
            value={data?.store.phone??""}
            description="Speak directly with our catering team."
          />
          <ContactMethod
            icon={<Mail className="h-6 w-6" />}
            title="Email Us"
            value={data?.store.email??""}
            description="Send us your questions or event details."
          />

          <ContactMethod
            icon={<MapPin className="h-6 w-6" />}
            title="Find Us"
            value={data?.store.address || ""}
            description="Visit our catering location."
          />
        </div>
      </div>
    </section>
  );
}

function ContactMethod({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="border-b p-8 md:border-b-0 md:border-r last:border-r-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>

      <h2 className="mt-6 text-xl font-bold">{title}</h2>

      <p className="mt-2 font-medium">{value}</p>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}