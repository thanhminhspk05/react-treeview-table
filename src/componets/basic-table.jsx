import { createTable, getCoreRowModel, getExpandedRowModel, useTableInstance } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

function convertDataToExpect(data) {
  const result = {
    method_name: 'getJobInfo(com.tmax.proobject.model.dataobject.DataObject arg0)',
    class_name: 'com.tmax.jo.SHJO',
    class_type: 'JOB_OBJECT',
    subRows: [],
  };
  const map = new Map();
  data.forEach((item) => {
    const { callDepth, callee_class, callee_method, callee_type, caller_class } = item;
    if (callDepth === 1) {
      const obj = {
        method_name: callee_method,
        class_name: callee_class,
        class_type: callee_type,
        subRows: [],
      };
      result.subRows.push(obj);
      map.set(callee_class, obj.subRows);
    } else {
      const subRows = map.get(caller_class);
      if (subRows) {
        const obj = {
          method_name: callee_method,
          class_name: callee_class,
          class_type: callee_type,
          subRows: [],
        };
        subRows.push(obj);
        map.set(callee_class, obj.subRows);
      }
    }
  });
  return [result];
}

const table = createTable();

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
  const [data, setData] = useState([]);
  const [columns] = useState([...defaultColumns]);
  const [expanded, setExpanded] = useState({});

  const fetchData = async () => {
    const response = await fetch(
      'http://101.101.209.11:14000/proobject/proobject-manager/ProminerMethodDetail?{%22dto%22:{%22declaring_class%22:%22com.tmax.jo.SHJO%22,%22method_name%22:%22getJobInfo(com.tmax.proobject.model.dataobject.DataObject%20arg0)%22,%22searchType%22:%22Forward%22}}&_=1686820402819'
    );
    const data = await response.json();
    const newData = data.dto.DevMnrDto.map((row) => ({
      callDepth: Number(row.callDepth),
      callee_class: row.callee_class,
      callee_method: row.callee_method,
      callee_type: row.callee_type,
      caller_class: row.caller_class,
      caller_method: row.caller_method,
    }));

    setData(convertDataToExpect(newData));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
