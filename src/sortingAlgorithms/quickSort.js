
export function getQuickSortAnimations(array) {
    const animations = [];
    quickSort(array, 0, array.length-1, animations);
    return animations;
  }


 function pivot(arr, start = 0, end = arr.length - 1,animations) {
   //Push Pivot to animations to change to tertiary color
    animations.push({content: end, swap:false,pivotElement:true});
    //Set pivot to last value in arr
    let pivot = arr[end];
    //Start your swapIdx at the beginning of the array
    let swapIdx = start;
    //Iterate through array
    for (let i = start; i < end; i++) {
        //Save swapIdx to temp variable in order to set bar color back to primary
        const temp = swapIdx;
        // Push potential swap indices to animations to set secondary color. Push pivotIdx in animations  in order to prevent change of pivot color
        animations.push({content:[i,swapIdx],swap:false,pivotElement:false,pivotIdx: end});
      if (pivot > arr[i]) {
        //Swap indices swapIdx and i when pivot is greater than arr[i]
        //This will facilitate placing all values less than pivot are to its left and all values greater than pivot are to its right
         swap(arr, swapIdx, i);
         // Push desired swap indices and corresponding values to animations to swap the bar heights
         animations.push({content1:[i,arr[i]],content2:[swapIdx,arr[swapIdx]],swap:true,pivotElement:false,pivotIdx: end})
         // Increment swapIdx after swap so swap happens between past value and current value
         swapIdx++;  
      }
      // Push swap indices to animations to revert back to primary color. Push pivotIdx in animations  in order to prevent change of pivot color
      animations.push({content:[i,temp],swap:false,pivotElement:false,pivotIdx:end});

    }
    ////Push Pivot to animations to revert back to primary color
    animations.push({content: end, swap:false,pivotElement:true});

    /**
     * Final Pivot Swap. This will swap pivot with swapIdx so all values less than pivot are to its left and all values greater than pivot are to its right
     */
    //Push pivot(end) and swapIdx to animations to change to secondary colors;
    animations.push({content:[end,swapIdx],swap:false,pivotElement:false,pivotIdx: null});
    //Swap pivot(end) and swapIdx
    swap(arr, end, swapIdx);
    // Push desired swap indices and corresponding values to animations to swap the bar heights
    animations.push({content1:[end,arr[end]],content2:[swapIdx,arr[swapIdx]],swap:true,pivotElement:false,pivotIdx: null});
    // Push swap indices to animations to revert back to primary color. 
    animations.push({content:[end,swapIdx],swap:false,pivotElement:false,pivotIdx: null});
    return swapIdx;
  }
  
  
  function quickSort(arr, left = 0, right = arr.length -1,animations){
      if(left < right){
          let pivotIndex = pivot(arr, left, right,animations);
          //left
          quickSort(arr,left,pivotIndex-1,animations);
          //right
           quickSort(arr,pivotIndex+1,right,animations);
        }
       return;
  } 

  function swap(arr, idx1, idx2){
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }