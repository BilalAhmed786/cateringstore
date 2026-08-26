import TastingInquiryDetails from "../components/TastingInquiryDetails";


interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TastingInquiryPage({
  params,
}: PageProps) {
  const { id } = await params;

  return <TastingInquiryDetails id={id} />;
}