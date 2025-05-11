import { Court, getCourts } from "@/app/services/business-service";
import CourtsByBusiness from "./CourtsByBusiness";

export default async function CourtsByBusinessPage({ params }: { params: { uuid: string } }) {
  /* eslint-disable */
  let _courts: Court[] = []
  if (process.env.OWNER_ID && params.uuid){
    _courts = await getCourts(process.env.OWNER_ID, params.uuid)
  }
  /* eslint-enable */

  return (<CourtsByBusiness/>)
}