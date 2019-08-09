(() => {
  /**
   * @param {character[][]} grid
   * @return {number}
   */
  var numIslands = function(grid) {
    let N = grid.length;

    if (N === 0) {
      return 0;
    }

    let M = grid[0].length;

    if (M === 0) {
      return 0;
    }

    let result = [];
    let flag = 0;
    let flags = new Array(N)
      .fill(undefined)
      .map((item) => new Array(M).fill(undefined));

    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < M; ++j) {
        if (grid[i][j] === '1') {
          check(i, j);
        }
      }
    }

    return result.length;

    function check(i, j) {
      let left = grid[i] && grid[i][j - 1];
      // let right = grid[i + 1][j];
      // let bottom = grid[i][j + 1];
      let top = grid[i - 1] && grid[i - 1][j];

      if (left === '1') {
        flags[i][j] = flags[i][j - 1];
      }

      if (top === '1') {
        flags[i][j] = flags[i - 1][j];
      }

      if (left === '1' && top === '1') {
        // merge;
        const flag1 = flags[i - 1][j];
        const flag2 = flags[i][j - 1];

        if (flag1 !== flag2) {
          mergeFlags(flag1, flag2);
        }
      }

      if (flags[i][j] === undefined) {
        flags[i][j] = flag;
        result.push([flag++]);
      }
    }

    function mergeFlags(flag1, flag2) {
      let a;
      let b;
      for (let i = 0; i < result.length; i++) {
        let flags = result[i];
        if (flags.indexOf(flag1) !== -1) {
          a = flags;
        }

        if (flags.indexOf(flag2) !== -1) {
          b = flags;
        }

        if (a && b) {
          break;
        }
      }

      if (a !== b) {
        // a = a.concat(b);
        a.push(...b);
        b.length = 0;
      }

      for (let i = result.length - 1; i >= 0; --i) {
        if (result[i].length === 0) {
          result.splice(i, 1);
        }
      }
    }
  };

  let grid1 = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0']
  ];

  let grid2 = [['1', '1', '1'], ['0', '1', '0'], ['1', '1', '1']];
  console.log(numIslands(grid2));
})();
