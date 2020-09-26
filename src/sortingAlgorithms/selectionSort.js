export function getSelectionSortAnimations(array) {
    const animations = [];
    selectionSort(array, 0, array.length, animations);
    return [animations,array];
  }


  function selectionSort(mainArray,
    startIdx,
    endIdx,
    animations){
        for(let i = 0; i < arr.length; i++){
            let lowest = i;
            for(let j = i+1; j < arr.length; j++){
                if(arr[j] < arr[lowest]){
                    lowest = j;
                }
            }
            if(i !== lowest){
                //SWAP!
                let temp = arr[i];
                arr[i] = arr[lowest];
                arr[lowest] = temp;
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
