"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { PadelCourtAddForm } from "@/components/PadelCourtAddForm";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BusinessesListConfig, CourtsListConfig } from "@/config/businesses";
import useCourtCreate from "@/hooks/businesses/useCourtCreate";
import useCourtsList from "@/hooks/businesses/useCourtsList";
import { toast } from "@/hooks/use-toast";
import { formatCurrencyARS } from "@/lib/utils";
import { Business, BusinessesListResponse, Court } from "@/types/businesses";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CourtsByBusiness({
  businessPublicId,
}: {
  businessPublicId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(
    BusinessesListConfig.queryKey
  ) as AxiosResponse<BusinessesListResponse>;

  const businessData: Business = data?.data?.data?.find(
    (business: Business) => business.business_public_id === businessPublicId
  ) as Business;

  const onSuccess = () => {
    toast({
      variant: "success",
      description: "Cancha creada correctamente.",
    });
    queryClient.invalidateQueries(CourtsListConfig(businessPublicId));
    setOpen(false);
  };

  const { mutateCreate, isPendingCreate } = useCourtCreate({
    onSuccess,
    businessPublicId,
  });
  const { courtsData, courtsIsLoading } = useCourtsList({ businessPublicId });

  const table_columns: ColumnDef<Court>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "price_per_hour",
      header: "Precio alquiler por hora",
      cell: ({ getValue }) => {
        const priceRawValue = getValue() as number;
        return formatCurrencyARS(priceRawValue);
      },
    },
    {
      header: "Acciones",
      cell: ({ row }) => {
        /* eslint-disable */
        /* Se va a usar cuando se hagan acciones en las canchas */
        const _court = row.original;
        /* eslint-enable */

        return (
          <div className="flex gap-x-3.5">
            <Button
              onClick={() =>
                router.push(
                  `./${_court.business_public_id}/courts/${_court.court_public_id}?name=${_court.name}`
                )
              }
            >
              Gestionar Cancha
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 w-[80vw] mx-auto">
      <div className="flex flex-col gap-y-3.5">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-bold">
            {businessData
              ? `${businessData.name} - ${businessData.location}`
              : ""}
          </h2>
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
              {isPendingCreate && (
                <div className="mb-4 text-blue-600">Cargando...</div>
              )}
              <PadelCourtAddForm
                onSubmit={mutateCreate}
                onClose={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <Separator></Separator>
        <div className="container mx-auto py-10">
          {courtsIsLoading ? (
            <div className="mb-4 text-blue-600">Cargando...</div>
          ) : (
            <DataTable columns={table_columns} data={courtsData?.data} />
          )}
        </div>
      </div>
    </div>
  );
}
