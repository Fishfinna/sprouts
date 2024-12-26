import { useState } from "react";
import "./table.scss";

interface Transaction {
    isSpending: boolean;
    category: string | null;
    date: Date | string | null;
    isNeed: boolean;
    price: number | null;
}

export function Table(params: { transactions: Transaction[] }) {
    const [rows, setRows] = useState(params.transactions);

    const handleChange = (e: Event, rowIndex: number, columnIndex: number) => {
        console.log(rowIndex, columnIndex);
        // const value = e.target.value;
        // const newRows = [...rows];

        // if (columnName === "price") {
        //     const formattedValue = formatNumber(value);
        //     newRows[rowIndex][columnName] = formattedValue;
        // } else {
        //     newRows[rowIndex][columnName] = value;
        // }

        // setRows(newRows);
    };

    const handleToggle = (rowIndex: number, columnName: number) => {
        const newRows = [...rows];
        newRows[rowIndex][columnName] = newRows[rowIndex][columnName] === "Income" ? "Spending" : "Income";
        setRows(newRows);
    };

    const handleNeedWantToggle = (rowIndex: number) => {
        const newRows = [...rows];
        newRows[rowIndex].isNeed = !newRows[rowIndex].isNeed;
        setRows(newRows);
    };

    const addRow = () => {
        setRows([
            ...rows,
            { isSpending: true, category: "", date: "", isNeed: false, price: null }
        ]);
    };

    const formatNumber = (num) => {
        const cleanedNum = num.replace(/[^0-9.]/g, "");
        if (cleanedNum === "" || cleanedNum === ".") return cleanedNum;

        const parts = cleanedNum.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (parts[1]) {
            parts[1] = parts[1].slice(0, 2);
        }

        return parts.join(".");
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
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>
                            <button
                                className={row.isSpending ? "red" : "green"}
                                onClick={() => handleToggle(rowIndex, "incomeSpending")}
                            >
                                {row.isSpending ? "Spending" : "Income"}
                            </button>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={row.category}
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
                            <button
                                className={row.isNeed ? "green" : "red"}
                                onClick={() => handleNeedWantToggle(rowIndex)}
                            >
                                {row.isNeed ? "Need" : "Want"}
                            </button>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={row.price}
                                onChange={(e) => handleChange(e, rowIndex, "price")}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
