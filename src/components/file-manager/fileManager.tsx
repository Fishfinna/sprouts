import React from "react";

export interface Transaction {
  isSpending: boolean;
  category?: string;
  date?: Date | string;
  isNeed: boolean | null;
  price?: string;
}

export function CSVReader({
  setTransactions,
}: {
  setTransactions: (transactions: Transaction[]) => void;
}) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      console.log(file.name);

      reader.onload = (e) => {
        const text = e.target?.result as string;

        // Parse the CSV
        const rows = text.split("\n").map((row) => row.split(","));

        // Get headers and create JSON array
        const headers = rows[0];
        console.log({ rows, headers });
        const data: Transaction[] = rows.slice(1).map((row) => {
          const values = row.map((value) => value.trim());
          const transaction: Transaction = {
            isSpending: values[0].toLowerCase() === "true",
            category: values[1] || undefined,
            date: values[2] || undefined,
            isNeed:
              values[3] === "true"
                ? true
                : values[3] === "false"
                ? false
                : null,
            price: values[4] || undefined,
          };
          return transaction;
        });

        setTransactions(data);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}

export default CSVReader;
