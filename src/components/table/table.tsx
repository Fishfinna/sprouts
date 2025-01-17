import { useEffect, useState } from "react";
import { Transaction } from "../../types/transaction";
import "./table.scss";

export function Table({
  transactions,
  setTransactions,
}: {
  transactions: Transaction[];
  setTransactions: (updatedTransactions: Transaction[]) => void;
}) {
  const defaultTransaction: Transaction = {
    isSpending: true,
    isNeed: true,
    category: "",
    date: new Date().toLocaleDateString("en-CA"),
    price: "",
    isTouched: false,
  };

  // Handling drag state
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnName: keyof Transaction
  ) => {
    const value = event.target.value;
    const updatedTransactions = [...transactions];
    const updatedRow = { ...updatedTransactions[rowIndex] };

    updatedRow[columnName] =
      columnName === "price" ? formatNumber(value) : value;

    updatedRow.isTouched = true; // Mark row as touched

    updatedTransactions[rowIndex] = updatedRow;
    setTransactions(updatedTransactions);

    // Add a new row only when the user starts typing in the last row
    if (
      rowIndex === transactions.length - 1 &&
      Object.values(updatedRow).some((value) => value !== "" && value !== false)
    ) {
      addRow();
    }
  };

  const handleToggle = (rowIndex: number, columnName: keyof Transaction) => {
    const updatedTransactions = [...transactions];
    const updatedRow = { ...updatedTransactions[rowIndex] };

    updatedRow[columnName] = !updatedRow[columnName];
    updatedRow.isTouched = true; // Mark as touched

    updatedTransactions[rowIndex] = updatedRow;
    setTransactions(updatedTransactions);
  };

  const addRow = () => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { ...defaultTransaction },
    ]);
  };

  const removeRow = (rowIndex: number) => {
    if (transactions.length > 1) {
      setTransactions(transactions.filter((_, index) => index !== rowIndex));
    } else {
      setTransactions([defaultTransaction]);
    }
  };

  const formatNumber = (num: string) => {
    const cleanedNum = num.replace(/[^0-9.]/g, "");
    if (!cleanedNum || cleanedNum === ".") return cleanedNum;

    const parts = cleanedNum.split(".").slice(0, 2);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parts[1]) parts[1] = parts[1].slice(0, 2);

    return "$" + parts.join(".");
  };

  // Handle drag start
  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  // Handle drag over
  const handleDragOver = (index: number) => {
    if (draggingIndex === null || draggingIndex === index) return;
    setDragOverIndex(index);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  // Handle drop
  const handleDrop = (index: number) => {
    if (draggingIndex === null || draggingIndex === index) return;
    const updatedTransactions = [...transactions];
    const draggedRow = updatedTransactions[draggingIndex];

    // Remove the dragged row and insert it in the new position
    updatedTransactions.splice(draggingIndex, 1);
    updatedTransactions.splice(index, 0, draggedRow);

    setTransactions(updatedTransactions);
    setDraggingIndex(null); // Reset dragging state
  };

  return (
    <div className="spending-table-container">
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
          {transactions.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              draggable
              onDragStart={() => handleDragStart(rowIndex)}
              onDragOver={(e) => {
                e.preventDefault();
                handleDragOver(rowIndex);
              }}
              onDragEnd={handleDragEnd}
              onDrop={() => handleDrop(rowIndex)}
              className={dragOverIndex === rowIndex ? "drag-over" : ""}
            >
              <td>
                <i className="material-icons grab-handle">drag_indicator</i>
                <button
                  className={row.isSpending ? "red" : "green"}
                  onClick={() => handleToggle(rowIndex, "isSpending")}
                >
                  {row.isSpending ? "Spending" : "Income"}
                </button>
              </td>
              <td>
                <input
                  type="text"
                  value={row.category || ""}
                  placeholder="category"
                  onChange={(e) => handleChange(e, rowIndex, "category")}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={row.date as string}
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
                <div className="price">
                  <input
                    type="text"
                    className={
                      !row.isSpending ? "green" : row.isNeed ? "gray" : "red"
                    }
                    value={row.price || ""}
                    placeholder="0.00"
                    onChange={(e) => handleChange(e, rowIndex, "price")}
                  />
                  <button
                    className="delete-row-button"
                    onClick={() => {
                      removeRow(rowIndex);
                    }}
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="add-row-button">
        <i className="material-icons">add</i>
      </button>
    </div>
  );
}
