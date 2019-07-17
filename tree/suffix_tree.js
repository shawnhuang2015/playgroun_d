(() => {
  let s1 = 'banana';

  class SuffixTree {
    constructor(str) {
      this.root = new TreeNode();
      this.size = str.length;

      for (let i = 0; i < this.size + 1; ++i) {
        this.add(new TreeNode(str.slice(i)));
      }
    }

    add(node) {
      this.root.add(node);
    }
  }

  class TreeNode {
    constructor(str) {
      this.children = [];
      this.value = str || '';
      this.parent = null;
      this.index = this.value.length;
    }

    get size() {
      return this.value.length;
    }

    split(len) {
      let newNode = new TreeNode(this.value.slice(len));
      this.value = this.value.slice(0, len);

      newNode.index = this.index;
      this.index = 0;

      newNode.children = this.children;
      newNode.children.forEach((child) => {
        child.parent = newNode;
      });

      this.children = [newNode];
      newNode.parent = this;
    }

    add(node) {
      for (let i = 0; i < this.children.length; ++i) {
        const child = this.children[i];
        let l = child.checkMatched(node);

        if (l > 0) {
          if (l != child.size) {
            child.split(l);
          }

          node.value = node.value.slice(l);
          child.add(node);

          return;
        }
      }

      this.children.push(node);
      node.parent = this;
    }

    checkMatched(node) {
      let i = 0;
      while (i < this.value.length) {
        if (this.value[i] === node.value[i]) {
          i++;
        } else {
          break;
        }
      }

      return i;
    }
  }

  let tree = new SuffixTree(s1);

  // dfs(tree.root);
  bfs(tree.root);

  function dfs(node) {
    for (let i = 0; i < node.children.length; ++i) {
      dfs(node.children[i]);
    }

    console.log(node);
  }

  function bfs(node) {
    let queue = [];
    queue.push(node);

    while (queue.length !== 0) {
      let node = queue.shift();

      console.log(node);

      node.children.forEach((child) => {
        queue.push(child);
      });
    }
  }

  // console.log(tree);
})();
