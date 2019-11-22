import React from "react";
import PropTypes from "prop-types";

const Table = ({ items, columns, sortColumn, onSort }) => {
  const renderItem = (item, columns) => (
    <tr key={item.objectID} className="table-row">
      {columns.map(({ path, content, key, width }) => (
        <td key={path || key} className="table-cell" style={{ width }}>
          {content ? content(item) : item[path]}
        </td>
      ))}
    </tr>
  );

  const renderSortIcon = (item, sortColumn) =>
    item.path === sortColumn.path ? (
      sortColumn.order === "asc" ? (
        <span>&uarr;</span>
      ) : (
        <span>&darr;</span>
      )
    ) : null;

  const renderHeaderCells = (column, sortColumn) => {
    const { label, path, key, width } = column;

    const isSortColumn = path === sortColumn.path;

    const style = {
      width,
      cursor: "pointer",
      fontWeight: isSortColumn ? "bold" : "normal"
    };

    return label ? (
      <th
        key={path}
        style={style}
        onClick={() => raiseSort(column, sortColumn)}
      >
        {label} {renderSortIcon(column, sortColumn)}
      </th>
    ) : (
      <th key={key} />
    );
  };

  const raiseSort = (column, sortColumn) => {
    if (column.path === sortColumn.path) {
      return onSort({
        ...sortColumn,
        order: sortColumn.order === "asc" ? "desc" : "asc"
      });
    }

    onSort({
      path: column.path,
      order: "asc"
    });
  };

  return (
    <table className="table">
      <thead>
        <tr className="table-row">
          {columns.map(column => renderHeaderCells(column, sortColumn))}
        </tr>
      </thead>

      <tbody>{items.map(item => renderItem(item, columns))}</tbody>
    </table>
  );
};

Table.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortColumn: PropTypes.shape({
    path: PropTypes.string.isRequired,
    order: PropTypes.oneOf(["asc", "desc"])
  }).isRequired,
  onSort: PropTypes.func.isRequired
};

export default Table;
