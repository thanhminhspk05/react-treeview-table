import { createTable, getCoreRowModel, getExpandedRowModel, useTableInstance } from '@tanstack/react-table';
import React, { useState } from 'react';
import EXAMPLE from '../example.json';

const table = createTable();
const defaultData = [...EXAMPLE];

const defaultColumns = [
  table.createDataColumn('method_name', {
    id: 'Method Name',
    cell: (props) => {
      return (
        <div
          style={{
            paddingLeft: `${props.row.depth * 2}rem`,
          }}
        >
          {props.row.getCanExpand() ? (
            <>
              <button
                style={{ cursor: 'pointer' }}
                onClick={props.row.getToggleExpandedHandler()}
              >
                {props.row.getIsExpanded() ? (
                  <span>
                    <i className="fa-solid fa-caret-right"></i>
                  </span>
                ) : (
                  <span>
                    <i className="fa-solid fa-caret-down"></i>
                  </span>
                )}
              </button>
              {props.getValue()}
            </>
          ) : (
            <>{props.getValue()}</>
          )}
        </div>
      );
    },
  }),
  table.createDataColumn('class_name', {
    id: 'Class Name',
  }),
  table.createDataColumn('class_type', {
    id: 'Class Type',
  }),
];

const BasicTable = () => {
  const [data] = useState([...defaultData]);
  const [columns] = useState([...defaultColumns]);
  const [expanded, setExpanded] = useState({});

  const instance = useTableInstance(table, {
    data,
    columns,
    state: { expanded },
    getSubRows: (row) => row.subRows,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  return (
    <div>
      <table border={1}>
        <thead>
          <th style={{ width: '60%' }}>Method Name</th>
          <th style={{ width: '20%' }}>Class Name</th>
          <th style={{ width: '20%' }}>Class Type</th>
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`depth-${row.depth}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
