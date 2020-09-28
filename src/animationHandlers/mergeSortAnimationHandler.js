import constants from '../constants'
export function mergeSortAnimationHandler(animations,arrayBars,animationSpeed){
    for (let i = 0; i < animations.length; i++) {
      //Identify if color change is needed (Color changes 2 out of every 3 animations i.e animations[0],animations[1],animations[3]...)
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          //Store the index of each bar (barOneIdx and barTwoIdx).
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          //Colors change to secondary color on the beginning of each triplet (i.e animaitons[0], animations[3]... )
          const color = i % 3 === 0 ? constants.SECONDARY_COLOR : constants.PRIMARY_COLOR;
          setTimeout(() => {
            //Chage color of array bars
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * animationSpeed);
        } else {
          setTimeout(() => {
            //On every third animation (i.e. animation[2]), height of corresponding array bar is updated to match algorithm merging
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * animationSpeed);
        }
      }
}