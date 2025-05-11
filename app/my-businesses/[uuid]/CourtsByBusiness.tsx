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


export default function CourtsByBusiness() {
  const [open, setOpen] = useState(false);

  const [businessData, setbusinessData] = useState<{ name: string; location: string } | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem("business_temp")
    if (raw) {
      setbusinessData(JSON.parse(raw))
    }
  }, [])

  if (!businessData) return <p>Cargando...</p>

  async function onSubmit(values: PadelCourtFormValues) {
    console.log(values)
    toast({
      variant: "success",
      description:"Cancha creada correctamente."
    })
    setOpen(false);
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
              <PadelCourtAddForm onSubmit={onSubmit} onClose={() => setOpen(false)}/>
              
            </DialogContent>
          </Dialog>
        </div>
        <Separator></Separator>
      </div>
    </div>
  )
}