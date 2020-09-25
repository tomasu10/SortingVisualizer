export function getBubbleSortAnimations(array) {
    const animations = [];
    bubbleSort(array, 0, array.length, animations);
    return animations;
  }


  function bubbleSort(mainArray,
    startIdx,
    endIdx,
    animations){
        let noSwaps;

        for(let i = endIdx; i > startIdx; i--){
          noSwaps = true;
            
          for(let j = startIdx; j < i - 1; j++){
            // These are the values you are comparing. You choose them once to change the color. No swap has occurred
            animations.push({content:[j,j+1],swap:false});
            // Check if current value is greater than next
            if(mainArray[j] > mainArray[j+1]){
                // Swap current value with next
                swap(mainArray,j,j+1);   
                //These are the values that you will be swapping. Include both the index and height. Swap has occurred
                animations.push({content1:[j,mainArray[j]],content2:[j+1,mainArray[j+1]],swap:true});
                noSwaps = false; 
            }
            //Compared values are pushed again to animations to change color back to original
            animations.push({content:[j,j+1],swap:false});
           
           
          }
          //If no swaps were completed, array is sorted. Break out of loops
          if(noSwaps) break;
        }
        console.log(animations);
        return;
    }
    //Swap function 
    function swap(array,idx1,idx2){
        const temp = array[idx1];
        array[idx1] = array[idx2];
        array[idx2] = temp;
    }
