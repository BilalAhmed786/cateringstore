import { CustomerDetails } from "../components/CustomerDetails";


interface CustomerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CustomerPage({
  params,
}: CustomerPageProps) {
  const { id } = await params;

  return <CustomerDetails id={id} />;
}