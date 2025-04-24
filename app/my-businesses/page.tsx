import { getData } from "@/app/services/business-service";
import MyBusinesses from "./MyBusinesses";

export default async function MyBusinessesPage() {
  const business_data = await getData()

  return (<MyBusinesses data={business_data}/>)
}