const data = [
  {
    callDepth: 1,
    callee_class: 'com.tmax.1',
    callee_method: 'setApplicationName.1',
    callee_type: 'DATA_OBJECT',
    caller_class: 'Parent_class',
    caller_method: 'Parent_method',
  },
  {
    callDepth: 2,
    callee_class: 'com.tmax.11',
    callee_method: 'setApplicationName.11',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.11',
    caller_method: 'setApplicationName.11',
  },
  {
    callDepth: '2',
    callee_class: 'com.tmax.12',
    callee_method: 'setApplicationName.12',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.11',
    caller_method: 'setApplicationName.11',
  },
  {
    callDepth: 3,
    callee_class: 'com.tmax.121',
    callee_method: 'setApplicationName.121',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.12',
    caller_method: 'setApplicationName.12',
  },
  {
    callDepth: 3,
    callee_class: 'com.tmax.122',
    callee_method: 'setApplicationName.122',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.12',
    caller_method: 'setApplicationName.12',
  },
  {
    callDepth: 3,
    callee_class: 'com.tmax.123',
    callee_method: 'setApplicationName.123',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.12',
    caller_method: 'setApplicationName.12',
  },
  {
    callDepth: 4,
    callee_class: 'com.tmax.1231',
    callee_method: 'setApplicationName.1231',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.123',
    caller_method: 'setApplicationName.123',
  },
  {
    callDepth: 4,
    callee_class: 'com.tmax.1232',
    callee_method: 'setApplicationName.1232',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.123',
    caller_method: 'setApplicationName.123',
  },
];

// const expect = [
//   {
//     method_name: 'Parent_method',
//     class_name: 'Parent_class',
//     class_type: 'JOB_OBJECT',
//     sub_row: [
//       { method_name: 'setApplicationName.11', class_name: 'com.tmax.11', class_type: 'DATA_OBJECT', sub_row: [] },
//       {
//         method_name: 'setApplicationName.12',
//         class_name: 'com.tmax.12',
//         class_type: 'JOB_OBJECT',
//         sub_row: [
//           {
//             method_name: 'setApplicationName.121',
//             class_name: 'com.tmax.121',
//             class_type: 'JOB_OBJECT',
//             sub_row: [],
//           },
//           {
//             method_name: 'setApplicationName.122',
//             class_name: 'com.tmax.122',
//             class_type: 'JOB_OBJECT',
//             sub_row: [],
//           },
//           {
//             method_name: 'setApplicationName.123',
//             class_name: 'com.tmax.123',
//             class_type: 'JOB_OBJECT',
//             sub_row: [
//               {
//                 method_name: 'setApplicationName.1231',
//                 class_name: 'com.tmax.1231',
//                 class_type: 'JOB_OBJECT',
//                 sub_row: [],
//               },
//               {
//                 method_name: 'setApplicationName.1232',
//                 class_name: 'com.tmax.1232',
//                 class_type: 'JOB_OBJECT',
//                 sub_row: [],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

function convertDataToExpect(data) {
  const result = {
    method_name: 'Parent_method',
    class_name: 'Parent_class',
    class_type: 'JOB_OBJECT',
    sub_row: [],
  };
  const map = new Map();
  data.forEach((item) => {
    const { callDepth, callee_class, callee_method, callee_type, caller_class } = item;
    if (callDepth === 1) {
      const obj = {
        method_name: callee_method,
        class_name: callee_class,
        class_type: callee_type,
        sub_row: [],
      };
      result.sub_row.push(obj);
      map.set(callee_class, obj.sub_row);
    } else {
      const sub_row = map.get(caller_class);
      if (sub_row) {
        const obj = {
          method_name: callee_method,
          class_name: callee_class,
          class_type: callee_type,
          sub_row: [],
        };
        sub_row.push(obj);
        map.set(callee_class, obj.sub_row);
      }
    }
  });
  return [result];
}

const expect = convertDataToExpect(data);

console.log(expect);
