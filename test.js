const data = [
  {
    callDepth: '1',
    callee_class: 'com.tmax.1',
    callee_method: 'setApplicationName.1',
    callee_type: 'OBJ_OBJECT',
    caller_class: 'com.tmax.jo.SHJO',
    caller_method: 'getJobInfo(com.tmax.proobject.model.dataobject.DataObject arg0)',
  },
  {
    callDepth: '2',
    callee_class: 'com.tmax.11',
    callee_method: 'setApplicationName.11',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.1',
    caller_method: 'setApplicationName.1',
  },
  {
    callDepth: '2',
    callee_class: 'com.tmax.12',
    callee_method: 'setApplicationName.12',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.1',
    caller_method: 'setApplicationName.1',
  },
  {
    callDepth: '3',
    callee_class: 'com.tmax.121',
    callee_method: 'setApplicationName.121',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.12',
    caller_method: 'setApplicationName.12',
  },
  {
    callDepth: '3',
    callee_class: 'com.tmax.122',
    callee_method: 'setApplicationName.122',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.12',
    caller_method: 'setApplicationName.12',
  },
  {
    callDepth: '3',
    callee_class: 'com.tmax.123',
    callee_method: 'setApplicationName.123',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.12',
    caller_method: 'setApplicationName.12',
  },
  {
    callDepth: '4',
    callee_class: 'com.tmax.1231',
    callee_method: 'setApplicationName.1231',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.123',
    caller_method: 'setApplicationName.123',
  },
  {
    callDepth: '4',
    callee_class: 'com.tmax.1232',
    callee_method: 'setApplicationName.1232',
    callee_type: 'DATA_OBJECT',
    caller_class: 'com.tmax.123',
    caller_method: 'setApplicationName.123',
  },
];

const expect = [
  {
    method_name: 'Parent_method',
    class_name: 'Parent_class',
    class_type: 'JOB_OBJECT',
    sub_row: [
      {
        method_name: 'setApplicationName.1',
        class_name: 'com.tmax.1',
        class_type: 'DATA_OBJECT',
        sub_row: [
          { method_name: 'setApplicationName.11', class_name: 'com.tmax.11', class_type: 'DATA_OBJECT', sub_row: [] },
          {
            method_name: 'setApplicationName.12',
            class_name: 'com.tmax.12',
            class_type: 'JOB_OBJECT',
            sub_row: [
              {
                method_name: 'setApplicationName.121',
                class_name: 'com.tmax.121',
                class_type: 'JOB_OBJECT',
                sub_row: [],
              },
              {
                method_name: 'setApplicationName.122',
                class_name: 'com.tmax.122',
                class_type: 'JOB_OBJECT',
                sub_row: [],
              },
              {
                method_name: 'setApplicationName.123',
                class_name: 'com.tmax.123',
                class_type: 'JOB_OBJECT',
                sub_row: [
                  {
                    method_name: 'setApplicationName.1231',
                    class_name: 'com.tmax.1231',
                    class_type: 'JOB_OBJECT',
                    sub_row: [],
                  },
                  {
                    method_name: 'setApplicationName.1232',
                    class_name: 'com.tmax.1232',
                    class_type: 'JOB_OBJECT',
                    sub_row: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
// Cha -> 1 -> 2(2) -> 22(3) -> 223(2)

function convertDataToExpect(data) {
  const result = {
    method_name: 'getJobInfo(com.tmax.proobject.model.dataobject.DataObject arg0)', // from props
    class_name: 'com.tmax.jo.SHJO', // from props
    class_type: 'JOB_OBJECT', // from props
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
const expected = convertDataToExpect(data);
console.log(expected);
console.log(expect);
// same result
