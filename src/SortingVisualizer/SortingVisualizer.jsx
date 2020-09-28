import React from 'react';
import constants from '../constants'
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSort.js';
import { getSelectionSortAnimations } from '../sortingAlgorithms/selectionSort.js';
import { mergeSortAnimationHandler } from '../animationHandlers/mergeSortAnimationHandler.js';
import { quickSortAnimationHandler } from '../animationHandlers/quickSortAnimationHandler.js';
import { selectionSortAnimationHandler } from '../animationHandlers/selectionSortAnimationHandler.js';
import { bubbleSortAnimationHandler } from '../animationHandlers/bubbleSortAnimationHandler.js';

import './SortingVisualizer.css';



export default class SortingVisualizer extends React.Component {
  constructor() {
    super();

    this.state = {
      array: [],
      waitForClick: false,
      numOfArrayBars: 100,
      animationSpeed : 3
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    if(this.state.array){
      const arrayBars = document.getElementsByClassName('array-bar');
      for(let i =0 ;i<arrayBars.length;i++){
        arrayBars[i].style.backgroundColor = constants.PRIMARY_COLOR;
      }
    }
    for (let i = 0; i < this.state.numOfArrayBars; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
   this.setState({ array });

  }

  handleSubmit(event){
    if(event.target.name === 'size-submit'){
      this.resetArray();
    }
    event.preventDefault();
  }

  handleChange(event) {
    if(event.target.name === 'array-size'){
      let size = parseInt(event.target.value);
      this.setState({numOfArrayBars: size});
    }
    else if (event.target.name === 'array-speed'){
      let speed = parseInt(event.target.value);
      this.setState({animationSpeed:speed});
    }
    
  }


// //FIX BUG WITH THIS FUNCTION
//   toggleButtons(length){
//     this.setState({waitForClick:true});
//     setTimeout(() => {
//       this.setState({waitForClick:false});
//       //Delay until end of sorting plus additional delay to extend past the end of the sorting algorithms
//     },(this.state.animationSpeed) *(length));
//   }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    mergeSortAnimationHandler(animations,arrayBars,this.state.animationSpeed);
    finishedSort(animations.length,arrayBars,this.state.animationSpeed);
    //this.toggleButtons(animations.length);
  }

  quickSort() {
    //Determine animations based on sorted array
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    quickSortAnimationHandler(animations,arrayBars,this.state.animationSpeed);
    finishedSort(animations.length,arrayBars,this.state.animationSpeed);
    //this.toggleButtons(animations.length);
    
  }

  selectionSort() {
    //Variable keeps track of color swaps
    const animations = getSelectionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    selectionSortAnimationHandler(animations,arrayBars,this.state.animationSpeed);
    finishedSort(animations.length,arrayBars,this.state.animationSpeed);
    //this.toggleButtons(animations.length);
    
  }

  bubbleSort() {
    //Determine animations based on sorted array
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    //this.toggleButtons(animations.length);
    bubbleSortAnimationHandler(animations,arrayBars,this.state.animationSpeed);
    finishedSort(animations.length,arrayBars,this.state.animationSpeed);
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
      const mergeSortedArray = getQuickSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        <h1>Sorting Visualizer</h1>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: constants.PRIMARY_COLOR,
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
        <div className= 'array-sizes'>
          <h4>Array Size:</h4>
          <form name = 'size-submit' onSubmit={this.handleSubmit}>
            <label htmlFor="array-size"></label>
            <input  name="array-size" id="array-size" type="number" value= {this.state.numOfArrayBars} min="2.00" max = "100.00" step="1.00" onChange={this.handleChange}></input>
            <input type="submit" value="Submit" />
          </form>
         
        </div>
        <div className = 'array-sorting-speeds'>
          <h4>Sorting Speeds</h4>
          <form name = 'speed-submit' onSubmit={this.handleSubmit}>
            <label htmlFor="array-speed"></label>
            <input  name="array-speed" id="array-speed" type="number" value= {this.state.animationSpeed} min="1.00" max = "27.00" step="1.00" onChange={this.handleChange}></input>
            <input type="submit" value="Submit" />
          </form>
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

function finishedSort(length,arrayBars,animationSpeed){
  setTimeout(() => {
    
    for(let i =0 ;i<arrayBars.length;i++){
      arrayBars[i].style.backgroundColor = constants.SUCCESS_COLOR;
    }
    //Delay until end of sorting plus additional delay to extend past the end of the sorting algorithms. Delay must be adjusted by animationSpeed/3 to account for the changes in speeds
  },(animationSpeed *length)+constants.ADDED_DELAY);
}