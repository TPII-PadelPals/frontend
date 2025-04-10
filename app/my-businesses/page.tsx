import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


export default function MyBusinessesPage() {
  return (
    <div className="p-6 w-[80vw] mx-auto">
      <div className="flex flex-col gap-y-3.5">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold">Mis Establecimientos</h1>
          <Button className="font-bold">+ Crear Establecimiento</Button>
        </div>
        <Separator></Separator>
      </div>
    </div>
  )
}