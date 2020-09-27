import constants from  '../constants';

export function bubbleSortAnimationHandler(animations,arrayBars){
    //Variable keeps track of color swaps
    let toSecondaryColor = true;
    for (let i = 0; i < animations.length; i++) {
      //Check to see if the animation encompasses a swap
      if (!animations[i].swap) {
        //No swap made
        // Select bars which are being compared
        const [barOneIdx, barTwoIdx] = animations[i].content;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        //Change colors of bars depending on the previous color
        const color = toSecondaryColor ? constants.SECONDARY_COLOR : constants.PRIMARY_COLOR;
        toSecondaryColor = toSecondaryColor ? false : true;
        //Change color of compared bars on a timer
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * constants.ANIMATION_SPEED_MS);
      } else {
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