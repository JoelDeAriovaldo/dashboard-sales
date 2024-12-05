import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ChevronUp,
  ChevronDown,
  Edit,
  Trash2,
  Eye,
  Search,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const DataTable = ({ columns, data, actions, pageSize = 10 }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Filtering logic
  const filteredData = React.useMemo(() => {
    return sortedData.filter((row) =>
      columns.some((column) =>
        String(row[column.accessor])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm, columns]);

  // Pagination logic
  const paginatedData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [filteredData, currentPage, pageSize]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      {/* Search Input */}
      <div className="mb-4 flex items-center relative">
        <Search className="absolute left-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  onClick={() => handleSort(column.accessor)}
                  className="cursor-pointer py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    {column.Header}
                    {sortConfig.key === column.accessor &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-2" size={16} />
                      ) : (
                        <ChevronDown className="ml-2" size={16} />
                      ))}
                  </div>
                </th>
              ))}
              <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200"
                  >
                    {column.render
                      ? column.render(row[column.accessor])
                      : row[column.accessor]}
                  </td>
                ))}
                <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200">
                  <div className="flex gap-2">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => action.onClick(row)}
                        className={`p-2 hover:bg-${action.color}-100 dark:hover:bg-${action.color}-900 rounded-md transition-colors`}
                      >
                        <action.icon
                          size={16}
                          className={`text-${action.color}-600 dark:text-${action.color}-400`}
                        />
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredData.length > pageSize && (
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
            {filteredData.length} entries
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev * pageSize < filteredData.length ? prev + 1 : prev
                )
              }
              disabled={currentPage * pageSize >= filteredData.length}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      color: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
  pageSize: PropTypes.number,
};

export default DataTable;
