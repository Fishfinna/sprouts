import { DisplayCalendar } from "./components/calendar/calendar";
import { CalendarDate } from "./types/calendar-date";
import { useState } from "react";
import { Table } from "./components/table/table";
import "./App.scss";

function App() {
  const [date, setDate] = useState<CalendarDate>(new Date());
  return (
    <>
      <h1>Sprout</h1>
      <DisplayCalendar date={date} setDate={setDate} />
      <p>{date instanceof Date ? date.toDateString() : null}</p>
      <Table />
    </>
  );
}

export default App;
