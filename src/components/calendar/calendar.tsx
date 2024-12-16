import Calendar from "react-calendar";
import { CalendarDate } from "../../types/calendar-date"
import "./calendar.scss";

export function DisplayCalendar(params: { date: CalendarDate, setDate: (arg0: CalendarDate) => void }) {
  return (
    <div className="calendar-container">
      <Calendar onChange={params.setDate} value={params.date} />
    </div>
  );
}
