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
  const [order, setOrder] = useState<string>("");
  const [documentData, setDocumentData] = useState(data);
  // const documentData = data;

  const sortColumnByName = (columnName: string) => {
    // if (order !== "name") {
    const sorted = [...data].sort((a: any, b: any) =>
      a[columnName].toLocaleLowerCase() > b[columnName].toLocaleLowerCase()
        ? 1
        : -1
    );
    setDocumentData(sorted);
    setOrder(columnName);
  };

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
            <th
              data-testid="thead-name"
              onClick={() => sortColumnByName("name")}
            >
              Name
              {order === "name" && <SvgArrowDown />}
            </th>
            <th
              data-testid="thead-type"
              onClick={() => sortColumnByName("type")}
            >
              Type
              {order === "type" && <SvgArrowDown />}
            </th>
            <th data-testid="thead-date">Date</th>
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
