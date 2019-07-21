(() => {
  // https://www.geeksforgeeks.org/ukkonens-suffix-tree-construction-part-1/
  let s1 = 'xabxac';
  let s2 = 'abcabxabcd';

  class SuffixTree {
    constructor(str) {
      this.index = 1;
      this.root = new TreeNode('', this);

      let N = str.length;
      for (let i = 1; i < N + 1; ++i) {
        let s = str.slice(0, i);

        for (let j = 0; j < i; ++j) {
          let target = s.slice(j);
          // this.root.addNode(new TreeNode(target, this));
          this.updateNode(this.root, target);
        }
      }
    }

    updateNode(node, str) {
      let N = node.children.length;

      for (let i = 0; i < N; i++) {
        let child = node.children[i];
        let index = child.findMatchIndex(str);

        if (index === 0) {
          continue;
        } else {
          if (index === str.length) {
          } else if (index === child.str.length) {
            if (child.children.length === 0) {
              child.addStr(str.slice(index));
            } else {
              this.updateNode(child, str.slice(index));
            }
          } else {
            this.splitNode(child, index);
            this.updateNode(child, str.slice(index));
          }

          return;
        }
      }

      this.addLeafNode(node, new TreeNode(str, this));
    }

    splitNode(node, index) {
      let target = new TreeNode(node.str.slice(index));
      target.index = node.index;

      node.str = node.str.slice(0, index);
      node.addChild(target);
    }

    addLeafNode(parent, node) {
      parent.addChild(node);
      node.index = this.index++;
    }
  }

  class TreeNode {
    constructor(str, tree) {
      this.str = str;
      this.index = 0;
      this.parent = null;
      this.children = [];
      this.tree = tree;
    }

    addStr(str) {
      this.str += str;
    }

    addChild(newNode) {
      this.children.push(newNode);
      newNode.parent = this;
    }

    findMatchIndex(str) {
      let i = 0;

      while (i < str.length && i < this.str.length) {
        if (str[i] === this.str[i]) {
          i++;
        } else {
          break;
        }
      }

      return i;
    }
  }

  console.log(new SuffixTree(s1));
})();
