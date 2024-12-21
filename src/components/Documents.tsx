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

type RenderSvgIcon = {
  header: string;
  currentSorted: string;
  sortOrder: boolean;
};

const Documents = () => {
  const [currentDocuments, setCurrentDocuments] = useState<File[]>(data);
  const [currentSorted, setCurrentSorted] = useState("");
  const [sortOrder, setSortOrder] = useState(false); // true = ascending, false = descending
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [isFolderOpen, setIsFolderOpen] = useState<boolean>(false);
  const [currentFolderName, setCurrentFolderName] = useState<string>("");

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

  const openFolder = (folder: File) => {
    if (folder.files) {
      setCurrentDocuments(folder.files);
      setCurrentFolderName(folder.name);
      setIsFolderOpen(true);
    }
  };

  const closeFolder = () => {
    setIsFolderOpen(false);
    setCurrentFolderName("");
    setCurrentDocuments(data);
  };

  return (
    <div className="p-10 justify-center bg-gray-50 min-h-screen w-full">
      <h1 className="p-4 pl-0">Documents</h1>
      {isFolderOpen && (
        <>
          <button onClick={closeFolder}>Back to documents</button>
          <h2>
            Viewing folder: <strong>{currentFolderName}</strong>{" "}
          </h2>
        </>
      )}
      <div className="mb-3">
        <input
          type="search"
          className="p4 w-full bg-gray-300"
          data-testid="documents-search-bar"
        />
      </div>
      <table
        data-testid="documents-table"
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
          {filteredDocuments.map((document, index) => (
            <>
              <tr data-testid={`documents-table-row-${index}`} key={index}>
                <td className="p-1">{document.name}</td>
                <td className="p-1">{document.type}</td>
                <td className="p-1">
                  {document.added ? document.added : "N/A"}
                </td>
                {document.type === "folder" && (
                  <button
                    data-testid={`documents-table-row-folder-button-${document.name}`}
                    onClick={() => openFolder(document)}
                  >
                    Open Folder
                  </button>
                )}
                <td></td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Documents;
