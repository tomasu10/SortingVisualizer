export function getSelectionSortAnimations(array) {
    const animations = [];
    selectionSort(array, 0, array.length, animations);
    return animations;
  }


  function selectionSort(mainArray,
    startIdx,
    endIdx,
    animations){
        for(let i = 0; i < mainArray.length; i++){
            let lowest = i;
            for(let j = i+1; j < mainArray.length; j++){
                const temp = lowest;
                //Push comparisons to animations array to change color
                animations.push({content:[j,lowest],swap:false,lowVal:lowest});
                if(mainArray[j] < mainArray[lowest]){
                    lowest = j;
                }
                //temp acts a temporary variable for lowest within nested loop 
                //Push comparions to animations again to revert back to original color
                animations.push({content:[j,temp],swap:false,lowVal:temp});
            }

            if(i !== lowest){
                //SWAP!
                //Push swap indices to animations to change color of bars to be swapped
                animations.push({content:[i,lowest],swap:false,lowVal:null});
                swap(mainArray,i,lowest);
                //Push new indices along with their values(height) in order to facilitate swap
                animations.push({content1:[i,mainArray[i]],content2:[lowest,mainArray[lowest]],swap:true,lowVal:null});
                //Push Swap indices to animations to revert back to original color
                animations.push({content:[i,lowest],swap:false,lowVal:null});
            }
        }
        return;
    }
    //Swap function 
    function swap(array,idx1,idx2){
        const temp = array[idx1];
        array[idx1] = array[idx2];
        array[idx2] = temp;
    }
