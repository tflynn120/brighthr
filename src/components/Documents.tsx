import React, { ReactNode, useEffect, useState } from "react";
import data from "../jsonData/data.json";

type File = {
  type: string;
  name: string;
  added?: string;
  files?: File[];
};

const SvgArrowDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4 inline-flex"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

const Documents = () => {
  const [documentData, setDocumentData] = useState<File[]>(data);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState(true); // true = ascending, false = descending
  const [currentFilter, setCurrentFilter] = useState<string>("");

  const sortedItems = [...documentData].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn as keyof File] || "";
      const bValue = b[sortColumn as keyof File] || "";
      if (aValue < bValue) return sortOrder ? -1 : 1;
      if (aValue > bValue) return sortOrder ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (field: string) => {
    setSortColumn(field);
    setSortOrder(sortColumn === field ? !sortOrder : true);
  };

  const filteredDocuments = sortedItems.filter((item) =>
    item.name.toLowerCase().includes(currentFilter.toLowerCase())
  );

  console.log(documentData);

  return (
    <div className="p-10 justify-center bg-gray-50 min-h-screen w-full">
      <h1 className="p-4 pl-0">Documents</h1>
      <table
        data-testid="doc-list-container"
        className="table-auto table text-left"
      >
        <thead className="p-1">
          <tr>
            <th data-testid="thead-name" onClick={() => handleSort("name")}>
              Name
              {currentFilter === "name" && <SvgArrowDown />}
            </th>
            <th data-testid="thead-type" onClick={() => handleSort("type")}>
              Type
              {currentFilter === "type" && <SvgArrowDown />}
            </th>
            <th data-testid="thead-date" onClick={() => handleSort("added")}>
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.map((docItem, index) => (
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
