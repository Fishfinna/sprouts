import React, { useState } from "react";
import "./fieManager.scss";
import { Transaction } from "../../types/transaction";

export function CSVReader({
  setTransactions,
}: {
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}) {
  const [fileMsg, setFileMsg] = useState("or drag and drop files here");
  const [fileError, setFileError] = useState("only .csv files may be imported");
  const [isActive, setIsActive] = useState(false);

  function loadFiles(event: ProgressEvent<FileReader>) {
    const text = event.target?.result as string;
    const rows = text
      .trim()
      .split("\n")
      .map((row) => row.replace("\r", "").split(","));
    const data = rows.slice(1);
    const headers = rows.slice(0, 1);
    console.log({ data, headers });
    const jsonData: Transaction[] = data.map((row) => {
      const values = row.map((value) => value.trim());
      const transaction: Transaction = {
        isSpending: values[0].toLowerCase() === "true",
        category: values[1] || undefined,
        date: values[2] || undefined,
        isNeed:
          values[3] === "true" ? true : values[3] === "false" ? false : null,
        price: values[4] || undefined,
      };
      return transaction;
    });

    setTransactions((prev) => [...prev, ...jsonData]);
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files;
    const csvFiles = [...(files || [])].filter((file) =>
      file.name.endsWith(".csv")
    );
    const dataTransfer = new DataTransfer();
    csvFiles.forEach((file) => dataTransfer.items.add(file));
    files = dataTransfer.files;

    if (files && files.length > 0) {
      const file = files[0];
      setFileMsg(
        files.length === 1 ? file.name : `${files.length} files selected`
      );

      const reader = new FileReader();

      reader.onload = loadFiles;
      reader.readAsText(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsActive(false);

    let files = event.dataTransfer.files;
    const csvFiles = [...files].filter((file) => file.name.endsWith(".csv"));
    const dataTransfer = new DataTransfer();
    csvFiles.forEach((file) => dataTransfer.items.add(file));
    files = dataTransfer.files;

    if (files && files.length > 0) {
      setFileMsg(
        files.length === 1 ? files[0].name : `${files.length} files selected`
      );

      const reader = new FileReader();
      reader.onload = loadFiles;
      reader.readAsText(files[0]);
    }
  };

  return (
    <>
      <div
        className={`file-drop-area ${isActive ? "is-active" : ""}`}
        onDragEnter={() => setIsActive(true)}
        onDragLeave={() => setIsActive(false)}
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
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
      </div>
      <p className="error">{fileError}</p>
    </>
  );
}

export default CSVReader;
