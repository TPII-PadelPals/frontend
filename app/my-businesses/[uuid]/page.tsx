import { Court, getCourts } from "@/app/services/business-service";
import CourtsByBusiness from "./CourtsByBusiness";

export default async function CourtsByBusinessPage() {
  /* eslint-disable */
  let _courts: Court[] = []
  if (process.env.OWNER_ID && process.env.BUSINESS_PUBLIC_ID){
    _courts = await getCourts(process.env.OWNER_ID, process.env.BUSINESS_PUBLIC_ID)
  }
  /* eslint-enable */

  return (<CourtsByBusiness/>)
}