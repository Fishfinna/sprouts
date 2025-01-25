import { DisplayCalendar } from "./components/calendar/calendar";
import { CalendarDate } from "./types/calendar-date";
import { Transaction } from "./types/transaction";
import { useState } from "react";
import { Table } from "./components/table/table";
import "./App.scss";
import CSVReader from "./components/file-manager/fileManager";

function App() {
  const [date, setDate] = useState<CalendarDate>(new Date());
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      isSpending: true,
      isNeed: true,
      date: new Date().toLocaleDateString("en-CA"),
    },
  ]);
  return (
    <>
      <h1>Sprout</h1>
      <DisplayCalendar date={date} setDate={setDate} />
      <CSVReader setTransactions={setTransactions} />
      <Table transactions={transactions} setTransactions={setTransactions} />
    </>
  );
}

export default App;
