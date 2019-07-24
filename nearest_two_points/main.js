(() => {
  // https://www.geeksforgeeks.org/closest-pair-of-points-using-divide-and-conquer-algorithm/

  let points = [[2, 3], [12, 30], [40, 50], [5, 1], [12, 10], [3, 4]];
  points = mergeSortPoints(points, 0);

  // console.log(mergeSortPoints(points, 0));
  // console.log(distance(points[0], points[1]));
  console.log(findShortestDistance(points));
  console.log(bruteForceShortestDistance(points));

  function findShortestDistance(points) {
    let N = points.length;
    if (N <= 1) {
      return Number.MAX_SAFE_INTEGER;
    }

    let mid = Math.floor(N / 2);

    let X = points[mid][0];

    let leftD = findShortestDistance(points.slice(0, mid));
    let rightD = findShortestDistance(points.slice(mid));

    let minD = Math.min(leftD, rightD);

    let strip = [];

    for (let i = 0; i < N; i++) {
      let point = points[i];

      if (Math.abs(point[0] - X) < minD) {
        strip.push(point);
      }
    }

    strip = mergeSortPoints(strip, 1);
    let stripMinD = bruteForceShortestDistance(strip, minD);

    console.log(points, strip, minD, stripMinD);
    return Math.min(minD, stripMinD);
  }

  function bruteForceShortestDistance(points, d) {
    if (d === undefined) {
      d = Number.MAX_SAFE_INTEGER;
    }

    let minD = Number.MAX_SAFE_INTEGER;
    let M = points.length;
    for (let i = 0; i < M - 1; ++i) {
      for (let j = i + 1; j < M; ++j) {
        let p1 = points[i];
        let p2 = points[j];

        if (Math.abs(p1[1] - p2[1]) < d) {
          minD = Math.min(minD, distance(p1, p2));
        }
      }
    }

    return minD;
  }

  function distance(point1, point2) {
    return Math.sqrt(
      Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2)
    );
  }

  function mergeSortPoints(points, index) {
    let N = points.length;

    if (N <= 1) {
      return points;
    }

    let mid = Math.floor(N / 2);

    let left = mergeSortPoints(points.slice(0, mid), index);
    let right = mergeSortPoints(points.slice(mid), index);

    let M = left.length + right.length;

    let leftIndex = 0;
    let rightIndex = 0;
    let result = [];

    while (result.length < M) {
      let leftV = left[leftIndex];
      let rightV = right[rightIndex];

      if (leftV === undefined) {
        result.push(rightV);
        rightIndex++;
      } else if (rightV === undefined) {
        result.push(leftV);
        leftIndex++;
      } else if (leftV[index] > rightV[index]) {
        result.push(rightV);
        rightIndex++;
      } else {
        result.push(leftV);
        leftIndex++;
      }
    }

    return result;
  }
})();
