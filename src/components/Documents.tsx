import React, { useEffect, useState } from "react";
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
  const documentData = data;
  // const documentData = data;

  const sortByName = () => {
    documentData.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  };

  console.log(documentData);

  return (
    <div className="p-10 flex justify-center bg-gray-50 min-h-screen w-full">
      <div className="w-full ">
        <h1 className="p-4 pl-0">Documents</h1>
        <DocumentFilter />
        <div className="grid grid-cols-12" data-testid="doc-list-container">
          <div className="col-start-1 col-end-6 border-b-4">
            <p className="text-xl">Title:</p>
          </div>
          <div className="col-start-6 col-end-11 border-b-4">
            <p className="text-xl">Type:</p>
          </div>

          <div className="col-start-11 col-end-13 border-b-4">
            <p className="text-xl">Date:</p>
          </div>
          {documentData.map((doc) => (
            <>
              <div className="col-start-1 col-end-6 border-b-4">
                <p>{doc.name}</p>
              </div>
              <div className="col-start-6 col-end-11 border-b-4">
                <p>{doc.type}</p>
              </div>
              <div className="col-start-11 col-end-13 border-b-4">
                <p>{doc.added ? doc.added : "N/A"}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
