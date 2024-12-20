import React, { ReactNode, useEffect, useState } from "react";
import data from "../jsonData/data.json";

export type docType = {
  type: string;
  name: string;
  added?: Date;
  files?: docType[];
};

type documentType = {
  type: string;
  name: string;
  added?: string;
  files?: {
    type: string;
    name: string;
    added: string;
  }[];
}[];

const DocumentFilter = () => {
  const [filterValue, setFilterValue] = useState("");

  const handleChange = (e: any) => {
    console.log("handle change ran");
    setFilterValue(e.target.value);
  };

  return (
    <div>
      <label>Filter: </label>
      <select value={filterValue} onChange={handleChange}>
        <option value="file">File type</option>
        <option value="name">Name</option>
        <option value="date">Date added</option>
      </select>
    </div>
  );
};

const Documents = () => {
  const [order, setOrder] = useState("order");
  const [documentData, setDocumentData] = useState(data);
  // const documentData = data;

  const sortByName = (column: string) => {
    if (order !== "name") {
      const sorted = [...data].sort((a: any, b: any) =>
        a[column].toLocaleLowerCase() > b[column].toLocaleLowerCase() ? 1 : -1
      );
      setDocumentData(sorted);
    }
  };

  console.log(documentData);

  return (
    <div className="p-10 justify-center bg-gray-50 min-h-screen w-full">
      <h1 className="p-4 pl-0">Documents</h1>
      <DocumentFilter />
      <table
        data-testid="doc-list-container"
        className="table-auto table text-left"
      >
        <thead className="p-1">
          <tr>
            <th data-testid="thead-name" onClick={() => sortByName("name")}>
              Name
            </th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {documentData.map((docItem, index) => (
            <tr data-testid={`documents-table-row-${index}`} key={index}>
              <td className="p-1">{docItem.name}</td>
              <td className="p-1">{docItem.type}</td>
              <td className="p-1">{docItem.added ? docItem.added : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Documents;
