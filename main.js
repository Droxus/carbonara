const inputCode = `
function calc() {
  let a = 2;
  let b = 3;
  
  for (let i = 0; i < 5; i++) {
    if (a == b) {
      console.log(i);
    }
    a = b * 2;
    b = a + 2;
  }
  
  console.log("a: ", a)
  console.log("b: ", b)
}
calc()
`;

function makeArrayDepth(lines) {
  // function makeArrayDepth() {
  // const arr = [];
  // let thisLevelArr = [];
  // let indexesOfEachLevel = [];
  // let currentLevelIndex = 0;
  // lines.forEach((line, index) => {
  //   if (line.includes("{")) {
  //     currentLevelIndex += 1;
  //     if (thisLevelArr.length > 0) {
  //       arr;
  //     }
  //     thisLevelArr = [];
  //   } else if (line.includes("}")) {
  //   }
  //   arr[index] = 0;
  // });
  // return arr;
  //
  // let obj = {};
  // let thisObj = obj;
  // let parent = null;
  // for (let i = 0; i < 5; i++) {
  //   thisObj = {
  //     data: {},
  //     parent: parent,
  //   };
  // if (parent === null) {
  //   obj = thisObj;
  // } else {
  //   parent.data = thisObj;
  // }
  // parent = thisObj;
  // }
  // return obj;

  const obj = {
    children: {},
    parent: null,
    data: [[]],
  };
  let thisObj = obj;
  let parent = obj;

  lines.forEach((line) => {
    thisObj.data[thisObj.data.length - 1].push(line);

    if (line.includes("{")) {
      thisObj = {
        children: {},
        parent: parent,
        data: [[]],
      };

      parent.children = thisObj;

      parent = thisObj;
    } else if (line.includes("}")) {
      thisObj = thisObj.parent;
      thisObj.data.push([]);
      parent = thisObj.parent;
    }
  });

  return obj;
}

const lines = inputCode
  .trim()
  .split("\n") // Or ";" (Use regExp)
  .filter((line) => line.trim() !== "");

const levelObject = makeArrayDepth(lines);

console.log(lines);
console.log(levelObject);

const expected = [
  // first level
  "function calc() {",
  [
    "  let a = 2;", // second level
    "  let b = 3;",
    "  ",
    "  for (let i = 0; i < 5; i++) {",
    [
      "    a = b * 2;", // third level
      "    b = a + 2;",
    ],
    "  }",
    "  ",
    '  console.log("a: ", a)',
    '  console.log("b: ", b)',
  ],
  "}",
  "calc()",
];

// console.log(makeArrayDepth(lines));
