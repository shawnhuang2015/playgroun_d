(() => {
  // https://www.geeksforgeeks.org/longest-common-substring-dp-29/
  let s1 = 'OldSite:GeeksforGeeks.org';
  let s2 = 'NewSite:GeeksQuiz.com';

  let s3 = 'a';
  let s4 = 'a';

  console.log(db_lcsubstring(s1, s2));
  console.log(db_lcsubstring(s3, s4));

  function db_lcsubstring(s1, s2) {
    let M = s1.length;
    let N = s2.length;

    let table = [];

    for (let i = 0; i < M + 1; ++i) {
      table.push([]);
    }

    let result = {
      length: 0,
      str: ''
    };

    for (let i = 0; i < M + 1; ++i) {
      for (let j = 0; j < N + 1; ++j) {
        // a === b, table[i][j] = table[i-1][j-1] + 1;
        // a !== b, table[i][j] = 0
        if (i === 0 || j === 0) {
          table[i][j] = 0;
        } else {
          let a = s1[i - 1];
          let b = s2[j - 1];

          if (a === b) {
            table[i][j] = table[i - 1][j - 1] + 1;

            if (table[i][j] > result.length) {
              result.length = table[i][j];
              result.str = s1.slice(i - result.length, i);
            }
          } else {
            table[i][j] = 0;
          }
        }
      }
    }

    console.log(table);
    return result;
  }

  function db_lcsubsequence(s1, s2) {
    let M = s1.length;
    let N = s2.length;

    let table = [];

    for (let i = 0; i < M + 1; ++i) {
      table.push([]);
    }

    let result = {
      length: 0,
      str: ''
    };

    for (let i = 0; i < M + 1; ++i) {
      for (let j = 0; j < N + 1; ++j) {
        // a === b, table[i][j] = table[i-1][j-1] + 1;
        // a !== b, table[i][j] = 0
        if (i === 0 || j === 0) {
          table[i][j] = 0;
        } else {
          let a = s1[i];
          let b = s2[j];

          if (a === b) {
            table[i][j] = table[i - 1][j - 1] + 1;

            if (table[i][j] > result.length) {
              result.length = table[i][j];
              result.str = s1.slice(i - result.length + 1, i);
            }
          } else {
            table[i][j] = 0;
          }
        }
      }
    }

    console.log(table);
    return result;
  }
})();
