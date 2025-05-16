"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { PadelCourtAddForm, PadelCourtFormValues } from "@/components/PadelCourtAddForm";
import { Court } from "@/app/services/business-service";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { formatCurrencyARS } from "@/lib/utils";


export default function CourtsByBusiness({ courts, businessPublicId } : { courts: Court[] , businessPublicId : string}) {
  const table_columns: ColumnDef<Court>[] = [
      {
          accessorKey: "name",
          header: "Nombre",
      },
      {
          accessorKey: "price_per_hour",
          header: "Precio alquiler por hora",
          cell: ({ getValue }) => {
            const priceRawValue = getValue() as Number;
            return formatCurrencyARS(priceRawValue)
          },
      },
      {
          header: "Acciones",
          cell: ({row}) => {
          
          /* eslint-disable */
          /* Se va a usar cuando se hagan acciones en las canchas */
          const _court = row.original
          /* eslint-enable */

          return (
              <div className="flex gap-x-3.5">
                <Button>Gestionar Matches</Button>
                <Button variant="outline">Editar</Button>
                <Button variant="destructive">Eliminar</Button>
              </div>
          )
          }
      }
  ]  

  const [open, setOpen] = useState(false);

  const [businessData, setbusinessData] = useState<{ name: string; location: string } | null>(null)
  
  const router = useRouter()

  useEffect(() => {
    const raw = localStorage.getItem("business_temp")
    if (raw) {
      setbusinessData(JSON.parse(raw))
    }
  }, [])

  if (!businessData) return <p>Cargando...</p>

  async function onSubmit(values: PadelCourtFormValues, businessPublicId: string) {
    const response = await fetch("/api/business-service/padel-courts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ formValues: values, businessPublicId }),
    })

    if (response.ok){
      toast({
        variant: "success",
        description:"Cancha creada correctamente."
      })
      setOpen(false);
    }
    else{
      toast({
        variant: "destructive",
        description:"Algo salió mal, intenta nuevamente más tarde."
      })
      setOpen(false);
    }
    router.refresh();
  }

  return (
    <div className="p-6 w-[80vw] mx-auto">
      <div className="flex flex-col gap-y-3.5">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-bold">{businessData.name} - {businessData.location}</h2>
        </div>
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-bold">Canchas</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button className="font-bold">+ Crear Cancha</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Cancha</DialogTitle>
              </DialogHeader>
              <PadelCourtAddForm onSubmit={onSubmit} onClose={() => setOpen(false)} businessPublicId={businessPublicId}/>
            </DialogContent>
          </Dialog>
        </div>
        <Separator></Separator>
        <div className="container mx-auto py-10">
          <DataTable columns={table_columns} data={courts} />
        </div>
      </div>
    </div>
  )
}