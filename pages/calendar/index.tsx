import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import "devextreme/dist/css/dx.light.css";
import Scheduler from "devextreme-react/scheduler";
import Task from "@/components/resuseable/Task";
import { CalendarContext } from "@/components/layout/CalendarContext";

export default function TodoPage() {
  function addEvent(e: any) {
    const f = { ...e.appointmentData, eventType: "Personal Event" };

    setEvents([...events, f]);
  }

  function updateEvent(e: any) {
    console.log(e);
  }

  function deleteEvent(e: any) {
    console.log(e);
  }

  const currentDate = new Date();

  const { events, setEvents } = useContext(CalendarContext);

  return (
    <>
      <Head>
        <title>Calendar | UNF App</title>
      </Head>
      <main>
        <Hero></Hero>
        <ToDoTitle>Todo</ToDoTitle>

        {events.map((event) => (
          <Task
            title={event.text}
            date={event.startDate}
            eventType={
              event.recurrenceRule ? "Reoccuring Event" : event.eventType
            }
            key={event.text}
          />
        ))}
        <Scheduler
          timeZone="America/New_York"
          dataSource={[...events]}
          views={["day", "week", "month", "agenda"]}
          defaultCurrentView="month"
          defaultCurrentDate={currentDate}
          height={600}
          showAllDayPanel={true}
          firstDayOfWeek={1}
          startDayHour={8}
          endDayHour={18}
          onAppointmentAdded={addEvent}
          onAppointmentUpdating={updateEvent}
          onAppointmentDeleted={deleteEvent}
        ></Scheduler>
      </main>
    </>
  );
}

const Hero = styled.div`
  height: 5rem;
`;

const ToDoTitle = styled.div`
  font-weight: bold;
  font-size: 3rem;

  margin: 1rem;
`;
