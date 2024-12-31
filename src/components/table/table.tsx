import { useState } from "react";
import { Transaction } from "../../types/transaction";
import "./table.scss";

export function Table(params: {
  transactions: Transaction[];
  setTransactions: (arg0: Transaction[]) => void;
}) {
  const handleChange = (event: Event, rowIndex: number, columnName: string) => {
    const value = event.target.value;
    if (columnName === "price") {
      event.target.value = formatNumber(value);
    }
  };

  const handleToggle = (rowIndex: number, columnName: string) => {
    const newRows = [...params.transactions];
    newRows[rowIndex][columnName] = !newRows[rowIndex][columnName];
    params.setTransactions(newRows);
  };

  const addRow = () => {
    params.setTransactions([
      ...params.transactions,
      { isSpending: true, category: "", date: "", isNeed: false, price: null },
    ]);
  };

  const formatNumber = (num) => {
    const cleanedNum = num.replace(/[^0-9.]/g, "");
    if (cleanedNum === "" || cleanedNum === ".") return cleanedNum;

    const parts = cleanedNum.split(".").slice(0, 2);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parts[1]) {
      parts[1] = parts[1].slice(0, 2);
    }

    return "$" + parts.join(".");
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Income/Spending</th>
          <th>Category</th>
          <th>Date</th>
          <th>Need/Want</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {params.transactions.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>
              <button
                className={row.isSpending ? "red" : "green"}
                value={row.isSpending}
                onClick={() => handleToggle(rowIndex, "isSpending")}
              >
                {row.isSpending ? "Spending" : "Income"}
              </button>
            </td>
            <td>
              <input
                type="text"
                value={row.category}
                placeholder="category"
                onChange={(e) => handleChange(e, rowIndex, "category")}
              />
            </td>
            <td>
              <input
                type="date"
                value={row.date}
                onChange={(e) => handleChange(e, rowIndex, "date")}
              />
            </td>
            <td>
              {row.isSpending ? (
                <button
                  className={row.isNeed ? "green" : "red"}
                  onClick={() => handleToggle(rowIndex, "isNeed")}
                >
                  {row.isNeed ? "Need" : "Want"}
                </button>
              ) : (
                <button className="gray" disabled>
                  N/A
                </button>
              )}
            </td>
            <td>
              <input
                type="text"
                className={row.isSpending && row.isNeed ? "green" : row.i}
                value={row.price}
                placeholder="0.00"
                onChange={(event: Event) =>
                  handleChange(event, rowIndex, "price")
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
