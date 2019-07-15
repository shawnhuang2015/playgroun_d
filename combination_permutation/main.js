(() => {
  let s = 'abcde';

  function permutation(str) {
    let arr = [];
    let N = str.length;

    if (N === 1) {
      arr.push(str);
    }

    for (let i = 0; i < N; ++i) {
      let firstChar = str[i];
      let leftChars = str.slice(0, i) + str.slice(i + 1);

      let leftArr = permutation(leftChars);

      for (let j = 0; j < leftArr.length; ++j) {
        arr.push(firstChar + leftArr[j]);
      }
    }

    return arr;
  }

  function combination(str) {
    let N = str.length;
    let arr = [];

    for (let i = 1; i < N; ++i) {
      arr.push(k_combination(str, i));
    }

    return arr;
  }

  function k_combination(str, k) {
    let N = str.length;
    let arr = [];

    if (k <= 0) {
      return [''];
    }

    for (let i = 0; i < N - k + 1; i++) {
      let firstChar = str[i];
      // let leftChars = str.slice(0, i) + str.slice(i + 1);
      let leftChars = str.slice(i + 1);
      // console.log(firstChar, leftChars, k - 1);
      let subs = k_combination(leftChars, k - 1);

      for (let j = 0; j < subs.length; j++) {
        arr.push(firstChar + subs[j]);
      }
    }

    return arr;
  }

  // let p = permutation(s);
  // console.log(p.length, p);

  // let kc = k_combination(s, 3);
  // console.log(kc.length, kc);

  let c = combination(s);
  let result = [];
  let set = new Set();

  console.log('start');

  // console.log(c.length, c);
  for (let i = 0; i < c.length; ++i) {
    for (let j = 0; j < c[i].length; ++j) {
      let p = permutation(c[i][j]);
      for (let k = 0; k < p.length; ++k) {
        if (set.has(p[k])) {
          console.log(p[k]);
        } else{
          set.add(p[k]);
        }

        result.push(p[k]);
      }
    }
  }

  console.log(result);
  console.log('done');
})();
