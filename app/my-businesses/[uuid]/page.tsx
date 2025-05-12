import { Court, getCourts } from "@/app/services/business-service";
import CourtsByBusiness from "@/components/CourtsByBusiness";

export default async function CourtsByBusinessPage({ params }: { params: { uuid: string } }) {
  /* eslint-disable */
  let courts: Court[] = []
  if (process.env.OWNER_ID && params.uuid){
    courts = await getCourts(process.env.OWNER_ID, params.uuid)
  }
  /* eslint-enable */

  return (<CourtsByBusiness courts={courts} businessPublicId={params.uuid}/>)
}