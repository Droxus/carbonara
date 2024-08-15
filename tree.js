export default class Tree {
  root;
  constructor() {
    root = new Node(null);
  }
}

class Node {
  parent;
  children;
  data;
  constructor(parent, data) {
    this.parent = parent;
    this.data = data;
    this.children = [];
  }
}
