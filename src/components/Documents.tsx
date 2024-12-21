import React, { useState } from "react";
import data from "../jsonData/data.json";
import { SvgArrowDown, SvgArrowLeft, SvgArrowUp } from "./SvgArrows";

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
    <div className="p-4 sm:p-6 bg-gray-50 w-full min-h-screen font-body">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        Documents
      </h1>
      <div className="mb-4 sm:mb-6">
        <input
          value={currentFilter}
          name="documents-search-bar"
          onChange={(e) => setCurrentFilter(e.target.value)}
          type="search"
          placeholder="Search documents"
          className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          data-testid="documents-search-bar"
        />
      </div>
      {isFolderOpen && (
        <>
          <button
            className="text-blue-500 hover:text-blue-700 text-sm sm:text-base border border-blue-500 flex mb-4 items-center px-2 py-1 rounded-md"
            onClick={closeFolder}
          >
            <SvgArrowLeft />
            Back to documents
          </button>
          <div className="text-base sm:text-lg text-gray-900 mb-4">
            Viewing folder: <strong>{currentFolderName}</strong>
          </div>
        </>
      )}
      <div className="overflow-x-auto">
        <table
          data-testid="documents-table"
          className="w-full bg-white shadow-md rounded-lg overflow-hidden text-sm sm:text-base"
        >
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th
                data-testid="thead-name"
                className="py-2 sm:py-3 px-2 sm:px-4 cursor-pointer hover:bg-blue-50"
                onClick={() => handleSort("name")}
              >
                Name
                <RenderSvgIcon
                  header="name"
                  currentSorted={currentSorted}
                  sortOrder={sortOrder}
                />
              </th>
              <th
                data-testid="thead-type"
                className="py-2 sm:py-3 px-2 sm:px-4 cursor-pointer hover:bg-blue-50"
                onClick={() => handleSort("type")}
              >
                Type
                <RenderSvgIcon
                  header="type"
                  currentSorted={currentSorted}
                  sortOrder={sortOrder}
                />
              </th>
              <th
                data-testid="thead-date"
                className="py-2 sm:py-3 px-2 sm:px-4 cursor-pointer hover:bg-blue-50"
                onClick={() => handleSort("added")}
              >
                Date
                <RenderSvgIcon
                  header="added"
                  currentSorted={currentSorted}
                  sortOrder={sortOrder}
                />
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((document, index) => (
              <tr
                className="border-t border-gray-200"
                data-testid={`documents-table-row-${index}`}
                key={index}
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700">
                  {document.name}
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700">
                  {document.type}
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700">
                  {document.added ? document.added : "N/A"}
                </td>
                {document.type === "folder" && (
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <button
                      className="text-blue-500 hover:text-blue-700 text-sm sm:text-base border border-blue-500 flex items-center px-2 py-1 rounded-md"
                      data-testid={`documents-table-row-folder-button-${document.name}`}
                      onClick={() => openFolder(document)}
                    >
                      Open Folder
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documents;
