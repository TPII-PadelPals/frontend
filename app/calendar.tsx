'use client';

import React, { useEffect, useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { Button } from "@/components/ui/button"

export default function Calendar() {

    const [calendar, setCalendar] = useState<DayPilot.Calendar>();
    const [startDate, setStartDate] = useState<string>("2024-10-01");
    const [filter, setFilter] = useState<string | null>(null);

    const category = ["cancha_1", "cancha_2", "cancha_3", "cancha_4"]

    const events = [
        {
            id: 1,
            text: "Event 1",
            start: "2024-10-02T10:30:00",
            end: "2024-10-02T13:00:00",
            backColor: "#6aa84f",
            category: category[0],
        },
        {
            id: 2,
            text: "Event 2",
            start: "2024-10-03T09:30:00",
            end: "2024-10-03T11:30:00",
            backColor: "#3d85c6",
            category: category[1],
        },
        {
            id: 3,
            text: "Event 3",
            start: "2024-10-03T12:00:00",
            end: "2024-10-03T15:00:00",
            backColor: "#f1c232",
            category: category[2],
        },
    ];

    const filteredEvents = events.filter((event) => {
        if (!filter) return true;
        return event.category === filter;
    });

    useEffect(() => {
        if (calendar) {
            calendar.update({ startDate, events: filteredEvents });
        }
    }, [calendar, startDate, filter]);

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

    const onTimeRangeSelected = async (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        calendar?.clearSelection();
        if (modal.canceled) return;

        calendar?.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result,
        });
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <Button onClick={goToPreviousWeek}><div className="font-bold">Semana Anterior</div></Button>
                <Button onClick={goToNextWeek}><div className="font-bold">Semana Siguiente</div></Button>
            </div>

            <div className="my-2.5">
                <label className="font-bold">Filtrar por categoría:</label>
                <select onChange={(e) => setFilter(e.target.value)} value={filter || ""}>
                    <option value="">Todas</option>
                    <option value="cancha_1">cancha 1</option>
                    <option value="cancha_2">cancha 2</option>
                    <option value="cancha_3">cancha 3</option>
                    <option value="cancha_4">cancha 4</option>
                </select>
            </div>

            <DayPilotCalendar
                viewType="Week"
                startDate={startDate}
                onTimeRangeSelected={onTimeRangeSelected}
                controlRef={setCalendar}
            />
        </div>
    );
}