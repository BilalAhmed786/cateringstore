import { ReviewDetails } from "../components/ReviewDetails";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReviewDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  return <ReviewDetails id={id} />;
}