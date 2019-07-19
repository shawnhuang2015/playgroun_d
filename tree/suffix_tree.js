(() => {
  let s1 = 'banana';
  let s2 = 'abcabxabcd';
  class SuffixTree {
    constructor(str) {
      this.root = new TreeNode();
      this.size = str.length;

      for (let i = 0; i < this.size + 1; ++i) {
        this.add(new TreeNode(str.slice(i), i));
      }
    }

    add(node) {
      this.root.add(node);
    }

    search(str) {
      return this.root.search(new TreeNode(str)); // .map((index) => this.size - index);
    }
  }

  class TreeNode {
    constructor(str, index) {
      this.children = [];
      this.value = str || '';
      this.parent = null;
      this.index = index;

      this.indices = [];
    }

    get isEnd() {
      return this.children.length === 0;
    }

    get size() {
      return this.value.length;
    }

    toRoot() {
      let node = this;
      let result = '';
      while (node) {
        result = node.value + result;
        node = node.parent;
      }

      return result;
    }

    split(len) {
      let newNode = new TreeNode(this.value.slice(len), this.index);
      this.value = this.value.slice(0, len);

      this.indices.push(this.index);
      this.index = 0;

      newNode.children = this.children;
      newNode.children.forEach((child) => {
        child.parent = newNode;
      });

      this.children = [newNode];
      newNode.parent = this;
    }

    search(node) {
      for (let i = 0; i < this.children.length; ++i) {
        const child = this.children[i];
        let l = child.checkMatched(node);

        if (l > 0) {
          if (l != node.size) {
            node.value = node.value.slice(1);
            return child.search(node);
          } else {
            return child.getIndex();
          }
        }
      }

      return [];
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

    getIndex() {
      let queue = [this];
      let result = [];

      while (queue.length > 0) {
        let node = queue.pop();

        if (node.isEnd) {
          result.push(node.index);
        } else {
          queue.push(...node.children);
        }
      }

      return result;
    }
  }

  // let tree = new SuffixTree(s1);
  let tree2 = new SuffixTree(s2);

  console.log(tree2.search('ab'));
  // dfs(tree.root);
  // bfs(tree.root);

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
