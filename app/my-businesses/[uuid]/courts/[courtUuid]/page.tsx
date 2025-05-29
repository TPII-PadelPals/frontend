"use client";

import { PAdelCourtAvailabilityAddForm } from "@/components/PadelCourtAddAvailabilityForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CourtsAvailabilityListConfig } from "@/config/businesses";
import useCourtAvailabilityCreate from "@/hooks/businesses/useCourtAvailabilityCreate";
import useCourtsAvailabilityList from "@/hooks/businesses/useCourtAvailabilityList";
import useMatchesList from "@/hooks/matches/useMatchesList";
import { useToast } from "@/hooks/use-toast";
import { CourtAvailability } from "@/types/businesses";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const AVAILABLE_COLOR = "#32CD32"
const PROVISIONAL_COLOR = "#FACC15"
const RESERVED_COLOR = "#EF4444"
const BLACK_COLOR = "#000000"

const thisWeeekDays = (inputDate: Date) => {
  const days = [];
  const dayCursor = new Date(inputDate);
  for (let i = 0; i < 7; i++) {
    days.push(dayCursor.toISOString().split("T")[0]);
    dayCursor.setDate(dayCursor.getDate() + 1);
  }
  return days;
};

const CourtAvailabilityPage = ({
  params,
}: {
  params: { uuid: string; courtUuid: string };
}) => {
  // esto hay que pasarlo todo a court ID en el business service y eliminarlo
  const searchParams = useSearchParams();
  const courtName = searchParams.get("name");

  const [open, setOpen] = useState(false);
  const calendarRef = useRef<DayPilot.Calendar>();
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const goToPreviousWeek = () => {
    const date = new Date(startDate);
    date.setDate(date.getDate() - 7);
    setStartDate(date.toISOString().split("T")[0]);
  };

  const goToNextWeek = () => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 7);
    setStartDate(date.toISOString().split("T")[0]);
  };

  const onSuccess = () => {
    toast({
      variant: "success",
      description: "Disponibilidades agregadas correctamente.",
    });
    queryClient.invalidateQueries(
      CourtsAvailabilityListConfig(params.uuid, params.courtUuid)
    );
    setOpen(false);
  };

  const { mutateCreate, isPendingCreate } = useCourtAvailabilityCreate({
    onSuccess,
    business_public_id: params.uuid,
    court_public_id: params.courtUuid,
    court_name: courtName as string,
  });

  const { courtsAvailabilityData, courtsAvailabilityIsLoading } =
    useCourtsAvailabilityList({
      business_public_id: params.uuid,
      court_public_id: params.courtUuid,
      dates: thisWeeekDays(new Date(startDate)),
      court_name: courtName as string,
    });

  const { matchesData, matchesIsLoading } =
    useMatchesList({
      court_public_id: params.courtUuid,
      dates: thisWeeekDays(new Date(startDate)),
    });

  const parsedData = courtsAvailabilityData?.data?.map(
    (item: CourtAvailability) => {
      const match = matchesData?.data.find(
      (m) =>
        m.date === item.date &&
        m.time === item.initial_hour
      );

      let backColor = AVAILABLE_COLOR;
      let status = "Disponible";

      if (match) {
        if (match.status === "Reserved") {
          backColor = RESERVED_COLOR; // Rojo
          status = "Ocupado";
        } else if (match.status === "Provisional") {
          backColor = PROVISIONAL_COLOR; // Amarillo
          status = "Provisional";
        }
      }

      const initialHour = Number(item.initial_hour);
      const startDateString = `${item.date}T${String(initialHour).padStart(
        2,
        "0"
      )}:00:00`;
      const startDateObject = new Date(startDateString); // Interpreted as local time

      const endDateObject = new Date(startDateObject);
      endDateObject.setHours(startDateObject.getHours() + 1);

      // Helper to format Date object to 'yyyy-MM-ddTHH:mm:ss' local time string
      const formatToLocalISOString = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      };

      const displayHour = String(startDateObject.getHours()).padStart(2, "0");
      const displayMinutes = String(startDateObject.getMinutes()).padStart(
        2,
        "0"
      );

      let text = `${displayHour}:${displayMinutes} - ${status}`;

      return {
        start: formatToLocalISOString(startDateObject),
        end: formatToLocalISOString(endDateObject),
        backColor,
        id: item.court_public_id + item.date + item.initial_hour,
        text,
        html: `<div style="color: ${BLACK_COLOR};">${text}</div>`,
      };
    }
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        className="my-2"
      >
        <Button
          variant={"ghost"}
          className="mr-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2" />
          <div className="font-bold">Volver</div>
        </Button>
      </div>

      <div className="flex justify-center items-center flex-col">
        <h2 className="text-3xl font-bold">Gestionar Cancha</h2>
        <h2 className="text-2xl font-medium text-gray-800 ml-2">
          {courtName ? `${courtName}` : ""}
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        className="my-6"
      >
        <div className="flex justify-left">
          <Button className="mr-2" onClick={goToPreviousWeek}>
                <div className="font-bold">Semana Anterior</div>
              </Button>
              <Button onClick={goToNextWeek}>
                <div className="font-bold">Semana Siguiente</div>
          </Button>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600">
              <Plus className="mr-1" />
              <div className="font-bold">Agregar Disponibilidad</div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Disponibilidad</DialogTitle>
            </DialogHeader>
            {isPendingCreate && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
            <PAdelCourtAvailabilityAddForm
              onSubmit={mutateCreate}
              onClose={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      {(courtsAvailabilityIsLoading || matchesIsLoading) ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          <DayPilotCalendar
            viewType="Week"
            startDate={startDate}
            controlRef={calendarRef}
            eventBorderRadius={10}
            events={parsedData || []}
            timeRangeSelectedHandling="Disabled"
            eventMoveHandling="Disabled"
            eventResizeHandling="Disabled"
            eventRightClickHandling="Disabled"
            eventClickHandling="Disabled"
            eventDeleteHandling="Disabled"
            headerClickHandling="Disabled"
            onBeforeHeaderRender={(args) => {
              const date = args.header.start.toDate();
              date.setDate(date.getDate() + 1);
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const year = date.getFullYear();
              args.header.html = `${day}/${month}/${year}`;
            }}
          />

        </>
      )}
    </div>
  );
};

export default CourtAvailabilityPage;
