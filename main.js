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

function getTree(lines) {
  const obj = {
    children: [],
    parent: null,
  };
  let thisObj = obj;
  let parent = obj;

  lines.forEach((line) => {
    thisObj.children.push(line);

    if (line.includes("{")) {
      thisObj = {
        children: [],
        parent: parent,
      };

      parent.children.push(thisObj);
      parent = thisObj;
    } else if (line.includes("}")) {
      thisObj = thisObj.parent;
      parent = thisObj.parent;
    }
  });

  return obj;
}

const lines = inputCode
  .trim()
  .split("\n") // Or ";" (Use regExp)
  .filter((line) => line.trim() !== "");

const levelObject = getTree(lines);

console.log(lines);
console.log(levelObject);
