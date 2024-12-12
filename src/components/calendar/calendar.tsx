import { useState } from "react";
import Calendar from "react-calendar";
import "./calendar.scss";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function DisplayCalendar() {
  const [date, setDate] = useState<Value>(new Date());

  return (
    <div className="calendar-container">
      <Calendar onChange={setDate} value={date} />
    </div>
  );
}
