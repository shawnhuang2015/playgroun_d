let A = 'ABCDGH';
let B = 'AEDFHR';

console.log(lcs(A, B));

function lcs(a, b) {
  let subA = a.slice(1);
  let subB = b.slice(1);

  if (!a[0] || !b[0]) {
    return '';
  } else if (a[0] === b[0]) {
    return a[0] + lcs(subA, subB);
  } else {
    let c1 = lcs(subA, b);
    let c2 = lcs(a, subB);

    if (c1.length > c2.length) {
      return c1;
    } else {
      return c2;
    }
  }
}

function lcs1(a, b) {
  var aSub = a.substr(0, a.length - 1);
  var bSub = b.substr(0, b.length - 1);

  if (a.length === 0 || b.length === 0) {
    return '';
  } else if (a.charAt(a.length - 1) === b.charAt(b.length - 1)) {
    return lcs(aSub, bSub) + a.charAt(a.length - 1);
  } else {
    var x = lcs(a, bSub);
    var y = lcs(aSub, b);
    return x.length > y.length ? x : y;
  }
}
