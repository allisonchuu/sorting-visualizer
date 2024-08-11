// import React from "react";

export function SortAnimations(algoName, arr) {
  const animations = [];
  const tempArray = arr.slice();
  const sortObj = {
    animations: null,
    sortedArray: null,
  };

  switch (algoName) {
    case "Merge Sort":
      mergeSortAnimationsHelper(arr, 0, arr.length - 1, tempArray, animations);
      return { sortedArray: mergeSort(arr), animations: animations };
    case "Quick Sort":
    case "Heap Sort":
    case "Bubble Sort":
    default:
      sortObj.sortedArray = null;
      sortObj.animations = null;
  }

  return sortObj;
}

// Merge Sort Functions
const merge = (leftArr, rightArr) => {
  var result = [];

  while (leftArr.length > 0 && rightArr.length > 0)
    result.push(leftArr[0] < rightArr[0] ? leftArr.shift() : rightArr.shift());

  return result.concat(leftArr.length ? leftArr : rightArr);
};

function mergeSort(arr, animations) {
  if (arr === null) {
    return;
  }

  if (arr.length === 1) {
    return arr;
  }

  const midIndex = Math.floor(arr.length / 2);
  const leftArr = mergeSort(arr.slice(0, midIndex), animations);
  const rightArr = mergeSort(arr.slice(midIndex), animations);

  return merge(mergeSort(leftArr, animations), mergeSort(rightArr, animations));
}

// Merge Sort Animation Functions
function mergeSortAnimationsHelper(
  arr,
  startIdx,
  endIdx,
  tempArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortAnimationsHelper(tempArray, startIdx, middleIdx, arr, animations);
  mergeSortAnimationsHelper(tempArray, middleIdx + 1, endIdx, arr, animations);
  doMerge(arr, startIdx, middleIdx, endIdx, tempArray, animations);
}

function doMerge(arr, startIdx, middleIdx, endIdx, tempArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (tempArray[i] <= tempArray[j]) {
      animations.push([k, tempArray[i]]);
      arr[k++] = tempArray[i++];
    } else {
      animations.push([k, tempArray[j]]);
      arr[k++] = tempArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, tempArray[i]]);
    arr[k++] = tempArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, tempArray[j]]);
    arr[k++] = tempArray[j++];
  }
}

// Quick Sort Functions
// function quickSort(arr, animations) {
//   // terminate execution and return array if empty
//   // or containing one elemrnt
//   if (arr.length <= 1) return arr;

//   // set the pivot to the last item on the list
//   const pivot = arr[arr.length - 1];

//   // create temporary contaners
//   const leftArr = [];
//   const rightArr = [];

//   const tempArr = arr.slice(0, arr.length - 1);

//   // loop through the array to put the pivot in its sorted position
//   for (let i = 0; i < tempArr.length; i++) {
//     animations.push([i, i]);
//     if (tempArr[i] > pivot) {
//       rightArr.push(tempArr[i]);
//       animations.push([i, rightArr.findIndex((x) => x === tempArr[i])]);
//     } else {
//       leftArr.push(tempArr[i]);
//       animations.push([i, leftArr.findIndex((x) => x === tempArr[i])]);
//     }
//   }

//   // repeat same processes above on both partition
//   // until every item is at its sorted position
//   return [
//     ...quickSort(leftArr, animations),
//     pivot,
//     ...quickSort(rightArr, animations),
//   ];
// }
