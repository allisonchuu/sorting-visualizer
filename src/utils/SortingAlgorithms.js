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
      // return {
      //   sortedArray: quickSort(arr, animations, tempArray),
      //   animations: animations,
      // };
      break;
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

function mergeSort(arr) {
  if (arr === null) {
    return;
  }

  if (arr.length === 1) {
    return arr;
  }

  const midIndex = Math.floor(arr.length / 2);
  const leftArr = mergeSort(arr.slice(0, midIndex));
  const rightArr = mergeSort(arr.slice(midIndex));

  return merge(mergeSort(leftArr), mergeSort(rightArr));
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
// function quickSort(arr, animations, tempArray) {
//   if (arr.length <= 1) return arr;

//   //let pivotIdx = tempArray.findIndex((value) => value === arr[arr.length - 1]);
//   let animationTempArray = tempArray.slice();

//   const pivot = arr[arr.length - 1];

//   console.log("pivotindex", arr.length - 1);
//   console.log("pivotvalue", pivot);

//   animations.push([arr.length - 1, arr.length - 1]);
//   animations.push([arr.length - 1, arr.length - 1]);
//   animations.push([arr.length - 1, pivot]);

//   const leftArr = [];
//   const rightArr = [];

//   const tempArr = arr.slice(0, arr.length - 1);

//   let leftIdx = tempArray.findIndex((value) => value === arr[0]);
//   let j = -1;

//   for (let i = 0; i < tempArr.length; i++) {
//     let rightIdx = tempArray.findIndex((value) => value === arr[i]);

//     console.log(j);
//     if (tempArr[i] > pivot) {
//       animations.push([rightIdx, rightIdx]);
//       animations.push([rightIdx, rightIdx]);
//       animations.push([
//         rightIdx,
//         rightIdx,
//         animationTempArray[rightIdx],
//         animationTempArray[rightIdx],
//       ]);
//       rightArr.push(tempArr[i]);
//     } else {
//       j++;
//       if (i === 0) {
//         animations.push([rightIdx, rightIdx]);
//         animations.push([rightIdx, rightIdx]);
//         animations.push([
//           rightIdx,
//           rightIdx,
//           animationTempArray[rightIdx],
//           animationTempArray[rightIdx],
//         ]);
//       } else {
//         leftIdx = tempArray.findIndex((value) => value === arr[j]);
//         let tempValue = animationTempArray[rightIdx];
//         animationTempArray[rightIdx] = animationTempArray[leftIdx];
//         animationTempArray[leftIdx] = tempValue;

//         animations.push([leftIdx, rightIdx]);
//         animations.push([leftIdx, rightIdx]);
//         animations.push([
//           leftIdx,
//           rightIdx,
//           animationTempArray[rightIdx],
//           animationTempArray[leftIdx],
//         ]);
//       }
//       leftArr.push(tempArr[i]);
//     }
//   }

//   animations.push([arr.length - 1, arr.length - 1]);
//   animations.push([arr.length - 1, arr.length - 1]);
//   animations.push([arr.length - 1, pivot]);

//   return [
//     ...quickSort(leftArr, animations, tempArray),
//     pivot,
//     ...quickSort(rightArr, animations, tempArray),
//   ];
// }

// function quickSortAnimations(arr, animations, tempArray) {
//   if (arr.length <= 1) return arr;

//   const pivotIdx = tempArray.findIndex(
//     (value) => value === arr[arr.length - 1]
//   );
//   const pivot = tempArray[pivotIdx];

//   const leftArr = [];
//   const rightArr = [];

//   let leftIdx = tempArray.findIndex((value) => value === arr[0]);
//   let rightIdx = tempArray.findIndex((value) => value === arr[0]);

//   animations.push([pivotIdx, pivotIdx, pivotIdx]);
//   animations.push([pivotIdx, pivotIdx, pivotIdx]);
//   animations.push([pivotIdx, pivot, pivotIdx]);

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] > pivot) {
//       animations.push([rightIdx, rightIdx, pivotIdx]);
//       animations.push([rightIdx, rightIdx, pivotIdx]);
//       animations.push([rightIdx, tempArray[rightIdx], pivotIdx]);
//       rightIdx++;
//       rightArr.push(arr[i]);
//     } else {
//       if (i - 1 < 0) {
//         animations.push([rightIdx, rightIdx, pivotIdx]);
//         animations.push([rightIdx, rightIdx, pivotIdx]);
//         animations.push([rightIdx, tempArray[rightIdx], pivotIdx]);
//         rightIdx++;
//       } else {
//         animations.push([leftIdx, rightIdx, pivotIdx]);
//         animations.push([leftIdx, rightIdx, pivotIdx]);
//         animations.push([leftIdx, tempArray[rightIdx], pivotIdx]);
//         leftIdx++;
//         rightIdx++;
//         leftArr.push(arr[i]);
//       }
//     }
//     animations.push([pivotIdx, pivotIdx, pivotIdx]);
//     animations.push([pivotIdx, pivotIdx, pivotIdx]);
//     animations.push([pivotIdx, pivot, pivotIdx]);
//   }

//   return [
//     ...quickSortAnimations(leftArr, animations, tempArray),
//     pivot,
//     ...quickSortAnimations(rightArr, animations, tempArray),
//   ];
// }
