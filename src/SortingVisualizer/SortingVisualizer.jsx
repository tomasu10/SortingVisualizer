import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSort.js';
import { getSelectionSortAnimations } from '../sortingAlgorithms/selectionSort.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 20;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// This is the color of array bars for quickSort Pivot.
const TERTIARY_COLOR = 'yellow';


export default class SortingVisualizer extends React.Component {
  constructor() {
    super();

    this.state = {
      array: [],
      waitForClick: false
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
   this.setState({ array });
  //  const arr = [10,5,500,25];
  //  this.setState({arr});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    //Determine animations based on sorted array
    const [animations,array] = getQuickSortAnimations(this.state.array);
    console.log(array);
    //Variable keeps track of color swaps
    let toSecondaryColor = true;
    let toTertiaryColor = true;
    for (let i = 0; i < animations.length; i++) {
      // Store all bars in DOM in variable
      const arrayBars = document.getElementsByClassName('array-bar');
      if (animations[i].pivotElement) {
        const pivot = animations[i].content;
        const pivotStyle = arrayBars[pivot].style;
        const color = toTertiaryColor ? TERTIARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          pivotStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
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
          const color = toSecondaryColor ? SECONDARY_COLOR : PRIMARY_COLOR;
          toSecondaryColor = toSecondaryColor ? false : true;
          //Change color of compared bars on a timer
          setTimeout(() => {
            if(barOneIdx !== animations[i].pivotIdx)
            barOneStyle.backgroundColor = color;
            if(barTwoIdx !== animations[i].pivotIdx)
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
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
          }, i * ANIMATION_SPEED_MS);
        }
    }
    }
  }

  selectionSort() {
    //Variable keeps track of color swaps
    const animations = getSelectionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
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
        const color1 = toSecondaryColor ? SECONDARY_COLOR : PRIMARY_COLOR;
        const color2 = toTertiaryColor ? TERTIARY_COLOR : PRIMARY_COLOR;
        toSecondaryColor = toSecondaryColor ? false : true;
        toTertiaryColor = toTertiaryColor ? false : true;
        //Change color of compared bars on a timer
        setTimeout(() => {
          barOneStyle.backgroundColor = color1;
          barTwoStyle.backgroundColor = color2;
        }, i * ANIMATION_SPEED_MS);
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
        }, i * ANIMATION_SPEED_MS);
      }
    } 
  }

  bubbleSort() {
    //Determine animations based on sorted array
    const animations = getBubbleSortAnimations(this.state.array);
    //Variable keeps track of color swaps
    let toSecondaryColor = true;
    for (let i = 0; i < animations.length; i++) {
      // Store all bars in DOM in variable
      const arrayBars = document.getElementsByClassName('array-bar');
      //Check to see if the animation encompasses a swap
      if (!animations[i].swap) {
        //No swap made
        // Select bars which are being compared
        const [barOneIdx, barTwoIdx] = animations[i].content;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        //Change colors of bars depending on the previous color
        const color = toSecondaryColor ? SECONDARY_COLOR : PRIMARY_COLOR;
        toSecondaryColor = toSecondaryColor ? false : true;
        //Change color of compared bars on a timer
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
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
        }, i * ANIMATION_SPEED_MS);

      }
    }

  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const [animations,mergeSortedArray] = getQuickSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <div>
          <button className = 'array-buttons' disabled = {this.state.waitForClick} onClick={() => this.resetArray()}>Generate New Array</button>
          <button className = 'array-buttons' disabled = {this.state.waitForClick} onClick={() => this.mergeSort()}>Merge Sort</button>
          <button className = 'array-buttons' disabled = {this.state.waitForClick} onClick={() => this.quickSort()}>Quick Sort</button>
          <button className = 'array-buttons' disabled = {this.state.waitForClick} onClick={() => this.selectionSort()}>Selection Sort</button>
          <button className = 'array-buttons' disabled = {this.state.waitForClick} onClick={() => this.bubbleSort()}>Bubble Sort</button>
          {/* <button className = 'array-buttons' disabled = {this.state.waitForClick} onClick={() => this.testSortingAlgorithms()}>
            Test Sorting Algorithms
          </button> */}
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}