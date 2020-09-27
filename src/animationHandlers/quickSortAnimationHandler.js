import constants from '../constants';
export function quickSortAnimationHandler(animations,arrayBars){
    //Variable keeps track of color swaps
    let toSecondaryColor = true;
    let toTertiaryColor = true;
    for (let i = 0; i < animations.length; i++) {
      // Store all bars in DOM in variable
      if (animations[i].pivotElement) {
        const pivot = animations[i].content;
        const pivotStyle = arrayBars[pivot].style;
        const color = toTertiaryColor ? constants.TERTIARY_COLOR : constants.PRIMARY_COLOR;
        setTimeout(() => {
          pivotStyle.backgroundColor = color;
        }, i * constants.ANIMATION_SPEED_MS);
      }
      else{
      //Check to see if the animation encompasses a swap
        if (!animations[i].swap) {
          //No swap made
          // Select bars which are being compared
          const [barOneIdx, barTwoIdx] = animations[i].content;
          // console.log(`BarOne: ${barOneIdx} BarTwo: ${barTwoIdx}`);
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          //Change colors of bars depending on the previous color
          const color = toSecondaryColor ? constants.SECONDARY_COLOR : constants.PRIMARY_COLOR;
          toSecondaryColor = toSecondaryColor ? false : true;
          //Change color of compared bars on a timer
          setTimeout(() => {
            if(barOneIdx !== animations[i].pivotIdx)
            barOneStyle.backgroundColor = color;
            if(barTwoIdx !== animations[i].pivotIdx)
            barTwoStyle.backgroundColor = color;
          }, i * constants.ANIMATION_SPEED_MS);
        } 
        else {
          //Swap Made
          toSecondaryColor = false;
          //Change bar height according to swaps made
          setTimeout(() => {
                const [barOneIdx, newHeight1] = animations[i].content1;
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight1}px`;
                const [barTwoIdx, newHeight2] = animations[i].content2;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barTwoStyle.height = `${newHeight2}px`;
            }, i * constants.ANIMATION_SPEED_MS);
        }
        }
    }
}