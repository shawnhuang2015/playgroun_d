// const _ = require('lodash');

// function sayHello() {
//   console.log('Hello, World');
// }

// _.times(5, sayHello);


/* 
Your previous Plain Text content is preserved below:

This is just a simple shared plaintext pad, with no execution capabilities.

When you know what language you'd like to use for your interview,
simply choose it from the dropdown in the top bar.

You can also change the default language your pads are created with
in your account settings: https://coderpad.io/settings

Enjoy your interview!

        7
      /   \
    8      9  
  /  \      \
0     8      10
 \           /
  3         4   
  
  
 => [7,9,10,4]

Hi this is Shawn.
 */

class Node {
  constructor(val) {
    this.left= null;
    this.right = null;
    this.parent = null;

    this.value = val;
  }
  
  addLeft(node) {
    node.parent = this;
    this.left = node;
  }
  
  addRight(node) {
    node.parent = this;
    this.right = node;
  }
  
  get deepth() {
    let tmp = this;
    let i = 0;
    while (tmp.parent) {
      i++;
      tmp = tmp.parent;
    }
    
    return i;
  }
}

(() => {
  let root = new Node(7);

  let a = new Node(8);
  let b = new Node(9);
  root.addLeft(a);
  root.addRight(b);

  let a1 = new Node(0);
  let a2 = new Node(8);

  a.addLeft(a1);
  a.addRight(a2);

  a1.addRight(new Node(3));

  b.addRight(new Node(10));
  b.right.addLeft(new Node(4));
  
  console.log(customizedMax(root));
  
  function customizedMax(root) {
    let result = [];
    let queue = [];
    
    let tmpMax = Number.MIN_SAFE_INTEGER;
    let flag = -1;
    
    queue.push(root);
    
    while (queue.length > 0) {
        let target = queue.shift();
      
        if (target.deepth > flag) {
           if (flag === -1) {
             result.push(target.value);
             flag++;
           } else {
             result.push(tmpMax);
             tmpMax = Number.MIN_SAFE_INTEGER;
           }
          
           flag++;
        } else {
          if (target.value > tmpMax) {
            tmpMax = target.value;
          }
        }
      
        if (target.left) {
          queue.push(target.left);
        }
      
        if (target.right) {
          queue.push(target.right);
        }
    }

    result.push(tmpMax);
    
    return result;
  }
})();

// O(N * logN);


// queue: [7];
// deepth: [0]
// flag = -1;




