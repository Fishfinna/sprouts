import React, { useState } from "react";
import "./fieManager.scss";
import { Transaction } from "../../types/transaction";

export function CSVReader({
  setTransactions,
}: {
  setTransactions: (transactions: Transaction[]) => void;
}) {
  const [fileMsg, setFileMsg] = useState("or drag and drop files here");
  const [isActive, setIsActive] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileMsg(
        files.length === 1 ? file.name : `${files.length} files selected`
      );

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

  const handleDragEnter = () => setIsActive(true);
  const handleDragLeave = () => setIsActive(false);
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsActive(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setFileMsg(
        files.length === 1 ? files[0].name : `${files.length} files selected`
      );

      const reader = new FileReader();
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

      reader.readAsText(files[0]);
    }
  };

  return (
    <div
      className={`file-drop-area ${isActive ? "is-active" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <span className="fake-btn">
        Import File <i className="material-icons">add</i>
      </span>
      <span className="file-msg">{fileMsg}</span>
      <input
        className="file-input"
        type="file"
        multiple
        onChange={handleFileUpload}
        onFocus={handleDragEnter}
        onBlur={handleDragLeave}
      />
    </div>
  );
}

export default CSVReader;
