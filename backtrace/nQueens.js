/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  let result = [];

  solve(0, n, n, [], result);

  return result.map((tmp) => createBoard(tmp, n));
};

console.log(solveNQueens(5));

console.log(
  '[["Q....","..Q..","....Q",".Q...","...Q."],["Q....","...Q.",".Q...","....Q","..Q.."],[".Q...","...Q.","Q....","..Q..","....Q"],[".Q...","....Q","..Q..","Q....","...Q."],["..Q..","Q....","...Q.",".Q...","....Q"],["..Q..","....Q",".Q...","...Q.","Q...."],["...Q.","Q....","..Q..","....Q",".Q..."],["...Q.",".Q...","....Q","..Q..","Q...."],["....Q",".Q...","...Q.","Q....","..Q.."],["....Q","..Q..","Q....","...Q.",".Q..."]]'
);

function createBoard(indices, N) {
  let board = new Array(N).fill().map((item) => new Array(N).fill('.'));

  for (let i = 0; i < indices.length; i++) {
    let Q = getPosition(indices[i], N);
    board[Q.i][Q.j] = 'Q';
  }

  return board.map((row) => row.join(''));
}

function solve(index, n, N, exist, result) {
  if (n === 0) {
    result.push(exist.slice());
  }

  while (index < N * N) {
    if (isValid(index, exist, N)) {
      exist.push(index);
      solve(index + 1, n - 1, N, exist, result);
      exist.pop();
    }

    index++;
  }

  return false;
}

function isValid(index, exist, n) {
  let target = getPosition(index, n);

  return exist.every((item) => {
    let point = getPosition(item, n);

    if (point.i === target.i || point.j === target.j) {
      return false;
    }

    if (Math.abs(point.i - target.i) === Math.abs(point.j - target.j)) {
      return false;
    }

    return true;
  });
}

function getPosition(index, n) {
  let i = index % n;
  let j = Math.floor(index / n);

  return {
    i,
    j
  };
}
