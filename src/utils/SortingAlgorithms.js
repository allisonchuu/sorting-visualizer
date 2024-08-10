// import React from "react";

const merge = (leftArr, rightArr) => {
  let mergedArr = [],
    leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
    if (leftArr[leftIndex] < rightArr[rightIndex]) {
      mergedArr.push(leftArr[rightIndex]);
      leftIndex++;
    } else {
      mergedArr.push(rightArr[rightIndex]);
      rightIndex++;
    }
  }

  return mergedArr
    .concat(leftArr.slice(leftIndex))
    .concat(rightArr.slice(rightIndex));
};

export function MergeSort(arr) {
  if (arr === null) {
    return;
  }

  if (arr.length === 1) {
    return arr;
  }

  const middleIndex = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, middleIndex);
  const rightArr = arr.slice(middleIndex);

  return merge(MergeSort(leftArr), MergeSort(rightArr));
}
