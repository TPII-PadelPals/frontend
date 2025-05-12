import { Business, getData } from "@/app/services/business-service";
import MyBusinesses from "./MyBusinesses";

export default async function MyBusinessesPage() {
  // NEXT_PUBLIC_OWNER_ID debería ser una variable que obtengo de la sesión del usuario una vez logueado.
  let business_data: Business[] = []
  if (process.env.NEXT_PUBLIC_OWNER_ID){
    business_data = await getData(process.env.NEXT_PUBLIC_OWNER_ID)
  }

  return (<MyBusinesses data={business_data}/>)
}