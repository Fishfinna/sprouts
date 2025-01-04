import { useEffect } from "react";
import { Transaction } from "../../types/transaction";
import "./table.scss";

export function Table({
  transactions,
  setTransactions,
}: {
  transactions: Transaction[];
  setTransactions: (updatedTransactions: Transaction[]) => void;
}) {
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
    updatedTransactions[rowIndex] = updatedRow;

    setTransactions(updatedTransactions);
  };

  const handleToggle = (rowIndex: number, columnName: keyof Transaction) => {
    const updatedTransactions = [...transactions];
    updatedTransactions[rowIndex][columnName] =
      !updatedTransactions[rowIndex][columnName];
    setTransactions(updatedTransactions);
  };

  const addRow = () => {
    setTransactions([
      ...transactions,
      { isSpending: true, isNeed: true, category: "", date: "", price: "" },
    ]);
  };

  const removeRow = (rowIndex: number) => {
    setTransactions(transactions.filter((_, index) => index !== rowIndex));
  };

  useEffect(() => {
    if (transactions[transactions.length - 1].price) {
      addRow();
    }
  }, [transactions]);

  const formatNumber = (num: string) => {
    const cleanedNum = num.replace(/[^0-9.]/g, "");
    if (!cleanedNum || cleanedNum === ".") return cleanedNum;

    const parts = cleanedNum.split(".").slice(0, 2);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parts[1]) parts[1] = parts[1].slice(0, 2);

    return "$" + parts.join(".");
  };

  return (
    <div>
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
            <tr key={rowIndex}>
              <td>
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
                  className={row.date ? "" : "faded"}
                  value={(row.date as string) || ""}
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
                    remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="gray add-row-button">
        +
      </button>
    </div>
  );
}
