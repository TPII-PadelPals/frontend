'use client'

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


export default function MyBusinessesPage() {



  async function onSubmit(values: BusinessFormValues) {
    console.log(values)
    // const APP_PORT: string  = '8002'
    // const APP_URL: string = `http://localhost`
    // const response = await fetch(`${APP_URL}:${APP_PORT}/api/v1/businesses`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ values }),
    // });

    // if (response.ok) {
    //     toast({ description: "Establecimiento Creado" });
    // } else {
    //     toast({ variant: "destructive", description: "Ocurrió un error. Intente de nuevo más tarde." });
    // }
    toast({
      variant: "success",
      description:"Establecimiento Creado."
    })
}

  return (
    <div className="p-6 w-[80vw] mx-auto">
      <div className="flex flex-col gap-y-3.5">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold">Mis Establecimientos</h1>
          <Dialog>
            <DialogTrigger asChild>
            <Button className="font-bold">+ Crear Establecimiento</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Establecimiento</DialogTitle>
              </DialogHeader>
              <BusinessAddForm onSubmit={onSubmit}/>
            </DialogContent>
          </Dialog>
        </div>
        <Separator></Separator>
      </div>
    </div>
  )
}