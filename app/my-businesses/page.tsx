import { getData } from "@/app/services/business-service";
import MyBusinesses from "./MyBusinesses";

export default async function MyBusinessesPage() {
  // OWNER_ID debería ser una variable que obtengo de la sesión del usuario una vez logueado.
  const OWNER_ID = "1d0c717c-f0ec-4d96-b201-dab75e2b83fe"
  const business_data = await getData(OWNER_ID)

  return (<MyBusinesses data={business_data}/>)
}