console.log(
  'https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/'
);

let txt = 'ABABDABACDABABCABAB';
let pat = 'ABABCABAB';

let pat1 = 'ABCDE';
let pat2 = 'AABAACAABAA';
let pat3 = 'AAACAAAAAC';
let pat4 = 'AAABAAA';

// For the pattern ABCDE,
// lps[] is [0, 0, 0, 0, 0]

// For the pattern AABAACAABAA,
// lps[] is [0, 1, 0, 1, 2, 0, 1, 2, 3, 4, 5]

// For the pattern AAACAAAAAC,
// lps[] is [0, 1, 2, 0, 1, 2, 3, 3, 3, 4]

// For the pattern AAABAAA,
// lps[] is [0, 1, 2, 0, 1, 2, 3]

// console.log(createLPS(pat1));
// console.log(createLPS(pat2));
// console.log(createLPS(pat3));
// console.log(createLPS(pat4));

const lps = createLPS(pat);

KMPSearch(txt, pat, lps);

function KMPSearch(text, target, lps) {
  console.log(text);

  let M = text.length;
  let N = target.length;

  let i = 0;
  let j = 0;

  while (i < M) {
    console.log(text[i], target[j], i, j, lps[j - 1]);
    if (text[i] === target[j]) {
      i++;
      j++;
    } else {
      if (j === 0) {
        i++;
      } else {
        j = lps[j - 1];
      }
    }

    if (j === N) {
      console.log('found at:', i - j);
      j = lps[j - 1];
    }
  }

  console.log('done');
}

function createLPS(target) {
  console.log(target);
  let result = [];

  let N = target.length;

  let i = 1;
  let len = 0;

  result[0] = len;

  while (i < N) {
    console.log(len, i, target[i], target[len], result);

    if (target[i] === target[len]) {
      len++;
      result[i] = len;
      i++;
    } else {
      if (len === 0) {
        result[i] = 0;
        i++;
      } else {
        len = result[len - 1];
      }
    }
  }

  return result;
}
