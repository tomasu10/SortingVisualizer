import constants from '../constants';

export function selectionSortAnimationHandler(animations,arrayBars){
    let toSecondaryColor = true;
    let toTertiaryColor = true;
    for (let i = 0; i < animations.length; i++) {
      //Check to see if the animation encompasses a swap
      if (!animations[i].swap) {
        //No swap made
        // Select bars which are being compared
        const [barOneIdx, barTwoIdx] = animations[i].content;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        //Change colors of bars depending on the previous color. Find lowest value and change
        const color1 = toSecondaryColor ? constants.SECONDARY_COLOR : constants.PRIMARY_COLOR;
        const color2 = toTertiaryColor ? constants.TERTIARY_COLOR : constants.PRIMARY_COLOR;
        toSecondaryColor = toSecondaryColor ? false : true;
        toTertiaryColor = toTertiaryColor ? false : true;
        //Change color of compared bars on a timer
        setTimeout(() => {
          barOneStyle.backgroundColor = color1;
          barTwoStyle.backgroundColor = color2;
        }, i * constants.ANIMATION_SPEED_MS);
      } else {
        //Swap Made
        toSecondaryColor = false;
        toTertiaryColor = false;
        //Change bar height according to swaps made
        setTimeout(() => {
          const [barOneIdx, newHeight1] = animations[i].content1;
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight1}px`;
          const [barTwoIdx, newHeight2] = animations[i].content2;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barTwoStyle.height = `${newHeight2}px`;
          const tempBackgroundColor = barOneStyle.backgroundColor;
          barOneStyle.backgroundColor = barTwoStyle.backgroundColor;
          barTwoStyle.backgroundColor = tempBackgroundColor;
        }, i * constants.ANIMATION_SPEED_MS);
      }
    } 

}