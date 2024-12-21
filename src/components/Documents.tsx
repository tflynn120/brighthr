import React, { useState } from "react";
import data from "../jsonData/data.json";
import SvgArrowDown from "./SvgArrowsDown";
import SvgArrowUp from "./SvgArrowsUp";

type File = {
  type: string;
  name: string;
  added?: string;
  files?: File[];
};

const Documents = () => {
  const [currentDocuments, setCurrentDocuments] = useState<File[]>(data);
  const [currentSorted, setCurrentSorted] = useState("");
  const [sortOrder, setSortOrder] = useState(false); // true = ascending, false = descending
  const [currentFilter, setCurrentFilter] = useState<string>("");
  console.log(sortOrder);
  const sortedItems = [...currentDocuments].sort((a, b) => {
    if (currentSorted) {
      const aValue = a[currentSorted as keyof File] || "";
      const bValue = b[currentSorted as keyof File] || "";
      if (aValue < bValue) return sortOrder ? -1 : 1;
      if (aValue > bValue) return sortOrder ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (field: string) => {
    setCurrentSorted(field);
    setSortOrder(currentSorted === field ? !sortOrder : true);
  };

  const filteredDocuments = sortedItems.filter((item) =>
    item.name.toLowerCase().includes(currentFilter.toLowerCase())
  );

  console.log(currentSorted);

  type RenderSvgIcon = {
    header: string;
    currentSorted: string;
    sortOrder: boolean;
  };

  const RenderSvgIcon: React.FC<RenderSvgIcon> = ({
    header,
    currentSorted,
    sortOrder,
  }) => {
    if (currentSorted === header)
      if (sortOrder === true) {
        return <SvgArrowDown />;
      } else if (sortOrder === false) {
        return <SvgArrowUp />;
      }
    return;
  };

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
              <RenderSvgIcon
                header="name"
                currentSorted={currentSorted}
                sortOrder={sortOrder}
              />
            </th>
            <th data-testid="thead-type" onClick={() => handleSort("type")}>
              Type
              <RenderSvgIcon
                header="type"
                currentSorted={currentSorted}
                sortOrder={sortOrder}
              />
            </th>
            <th data-testid="thead-date" onClick={() => handleSort("added")}>
              Date
              <RenderSvgIcon
                header="added"
                currentSorted={currentSorted}
                sortOrder={sortOrder}
              />
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
