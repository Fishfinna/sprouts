import React from "react";
import Calendar from "react-calendar";
import { CalendarDate } from "../../types/calendar-date";
import "./calendar.scss";

// Define the type to include the method we need
interface CalendarRef extends HTMLElement {
  setActiveStartDate?: (date: Date) => void;
}

export function DisplayCalendar(params: {
  date: CalendarDate;
  setDate: (arg0: CalendarDate) => void;
}) {
  const calendarRef = React.useRef<CalendarRef | null>(null);

  const handleTodayClick = () => {
    const today = new Date();
    params.setDate(today);
    if (
      calendarRef.current &&
      typeof calendarRef.current.setActiveStartDate === "function"
    ) {
      calendarRef.current.setActiveStartDate(today);
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        ref={calendarRef as React.RefObject<CalendarRef>}
        onChange={(value) => params.setDate(value as CalendarDate)}
        value={params.date}
      />

      <div className="today-button-container">
        <button
          className={
            new Date().toLocaleDateString("en-US") !=
            (params.date as Date).toLocaleDateString("en-US")
              ? ""
              : "hidden"
          }
          onClick={handleTodayClick}
        >
          return to today
        </button>
      </div>
    </div>
  );
}
