"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Business } from "@/app/services/business-service";
import { BusinessForm } from "@/components/BusinessForm";
import { BusinessEdit } from "@/components/BusinessEdit";
import { DataTable } from "@/components/ui/data-table";
import { BusinessesListConfig } from "@/config/businesses";
import useBusinessCreate from "@/hooks/businesses/useBusinessCreate";
import useBusinessesList from "@/hooks/businesses/useBusinessesList";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MyBusinesses() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [editOpen, setEditOpen] = useState(false);
  const [businessToEdit, setBusinessToEdit] = useState<Business | null>(null);

  const onSuccess = () => {
    toast({
      variant: "success",
      description: "Establecimiento creado correctamente.",
    });
    queryClient.invalidateQueries(BusinessesListConfig);
    setOpen(false);
  };

  const { mutateCreate, isPendingCreate } = useBusinessCreate({ onSuccess });
  const { businessesData, businessesIsLoading } = useBusinessesList();

  const handleEdit = (business: Business) => {
    setBusinessToEdit(business);
    setEditOpen(true);
  };


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
      cell: ({ row }) => {
        const business = row.original;

        return (
          <div className="flex gap-x-3.5">
            <Button
              onClick={() => {
                localStorage.setItem(
                  "business_temp",
                  JSON.stringify({
                    name: business.name,
                    location: business.location,
                  })
                );
                router.push(`/my-businesses/${business.business_public_id}`);
              }}
            >
              Gestionar Canchas
            </Button>
            <Button
              variant="outline"
              onClick={() => handleEdit(business)}
            >
              Editar
            </Button>
          </div>
        );
      },
    },
  ];

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
              {isPendingCreate && (
                <div className="mb-4 text-blue-600">Cargando...</div>
              )}
              <BusinessForm
                onSubmit={mutateCreate}
                onClose={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <BusinessEdit
            open={editOpen}
            onOpenChange={setEditOpen}
            businessToEdit={businessToEdit}
          />
        </div>
        <Separator></Separator>
        <div className="container mx-auto py-10">
          {businessesIsLoading ? (
            <div className="mb-4 text-blue-600">Cargando...</div>
          ) : (
            <DataTable columns={table_columns} data={businessesData?.data} />
          )}
        </div>
      </div>
    </div>
  );
}
