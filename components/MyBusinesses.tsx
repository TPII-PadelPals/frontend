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

import { toast } from "@/hooks/use-toast";
import { BusinessAddForm, BusinessFormValues } from "@/components/BusinessAddForm";
import { useState } from "react";
import { Business, createBusiness } from "@/app/services/business-service";
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from 'next/navigation'

export default function MyBusinesses({ data }: { data: Business[] } ){
  const router = useRouter()

  const table_columns: ColumnDef<Business>[] = [
      {
          accessorKey: "name",
          header: "Nombre",
      },
      {
          accessorKey: "location",
          header: "Dirección",
      },
      {
        header: "Acciones",
        cell: ({row}) => {
          const business = row.original
  
          return (
            <div className="flex gap-x-3.5">
              <Button onClick={
                () => {
                  localStorage.setItem("business_temp", JSON.stringify({
                    name: business.name,
                    location: business.location
                    }))
                  router.push(`/my-businesses/${business.business_public_id}`)
                  }
                }>
                Gestionar Canchas
              </Button>
              <Button variant="outline">Editar</Button>
              <Button variant="destructive">Eliminar</Button>
            </div>
          )
        }
      }
  ]

  const [open, setOpen] = useState(false);

  async function onSubmit(values: BusinessFormValues, ownerId: string | undefined) {
    const business = await createBusiness(values.name, values.location, ownerId)
    if (business) {
      toast({
        variant: "success",
        description: "Establecimiento creado correctamente."
      })
    } else {
      toast({
        variant: "destructive",
        description: "Algo salió mal, intenta nuevamente más tarde."
      })
    }
    setOpen(false)
    router.refresh();
  }

  return (
    <div className="p-6 w-[80vw] mx-auto">
      <div className="flex flex-col gap-y-3.5">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold">Mis Establecimientos</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button className="font-bold">+ Crear Establecimiento</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Establecimiento</DialogTitle>
              </DialogHeader>
              <BusinessAddForm onSubmit={onSubmit} onClose={() => setOpen(false)} ownerId={process.env.OWNER_ID}/>
              
            </DialogContent>
          </Dialog>
        </div>
        <Separator></Separator>
        <div className="container mx-auto py-10">
          <DataTable columns={table_columns} data={data} />
        </div>
      </div>
    </div>
  )
}