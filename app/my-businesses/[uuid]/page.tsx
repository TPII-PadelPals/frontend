import CourtsByBusiness from "@/components/CourtsByBusiness";

export default async function CourtsByBusinessPage({
  params,
}: {
  params: { uuid: string };
}) {
  return <CourtsByBusiness businessPublicId={params.uuid} />;
}
