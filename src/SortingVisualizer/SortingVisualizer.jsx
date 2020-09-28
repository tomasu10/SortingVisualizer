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
    // Set all array bars back to primary color after sorting
    if(this.state.array){
      const arrayBars = document.getElementsByClassName('array-bar');
      for(let i =0 ;i<arrayBars.length;i++){
        arrayBars[i].style.backgroundColor = constants.PRIMARY_COLOR;
      }
    }
    //Create new array bars with height of 5-500px
    for (let i = 0; i < this.state.numOfArrayBars; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
   this.setState({ array });
  }

  handleSubmit(event){
    //Reset Array if size is changed. Do not reset array if speed is changed
    if(event.target.name === 'size-submit'){
      this.resetArray();
    }
    event.preventDefault();
  }

  handleChange(event) {
    //Change the value of numArrayBars/animationSpeed as the user types
    if(event.target.name === 'array-size'){
      let size = parseInt(event.target.value);
      this.setState({numOfArrayBars: size});
    }
    else if (event.target.name === 'array-speed'){
      let speed = parseInt(event.target.value);
      this.setState({animationSpeed:speed});
    }
    
  }

    disableSortingButtons(){
      //Select all buttons and set disabled property to true
      const sortingElements = document.getElementsByClassName('sorting');
      for(const element of sortingElements){
        element.disabled = true;
      }
    }

    restoreSortingButtons(animationSpeed,length){
      //Select all buttons and set disabled property to false once sorting is complete
      const sortingElements = document.getElementsByClassName('sorting');
      setTimeout(()=>{
        for(const element of sortingElements){
          element.disabled = false;
        }
      },animationSpeed*length+constants.ADDED_DELAY);
    }

  sort(algorithmAnimations, animationsHandler){
    // Create DOM animations that correspond to sorting algorithm
    const animations = algorithmAnimations(this.state.array);
    //Save length of animations array and speed to determine how long alogrithm will take (length * speed)
    const size = animations.length;
    const speed = this.state.animationSpeed;
    //Store all array bars from DOM
    const arrayBars = document.getElementsByClassName('array-bar');
    //Disable all Buttons on DOM
    this.disableSortingButtons();
    //Display animations on DOM
    animationsHandler(animations,arrayBars,speed);
    //Set all array bars to green after sort is complete
    finishedSort(size,arrayBars,speed);
    //Restore all Buttons on DOM
    this.restoreSortingButtons(speed,size);
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
        <h1>Sorting Algorithm Visualizer <i className="fas fa-sort-amount-up"></i></h1>
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
          <button className = 'array-buttons sorting'  onClick={() => this.resetArray()}>Generate New Array</button>
          <button className = 'array-buttons sorting'  onClick={() => this.sort(getMergeSortAnimations,mergeSortAnimationHandler)}>Merge Sort</button>
          <button className = 'array-buttons sorting'  onClick={() => this.sort(getQuickSortAnimations,quickSortAnimationHandler)}>Quick Sort</button>
          <button className = 'array-buttons sorting'  onClick={() => this.sort(getSelectionSortAnimations,selectionSortAnimationHandler)}>Selection Sort</button>
          <button className = 'array-buttons sorting'  onClick={() => this.sort(getBubbleSortAnimations,bubbleSortAnimationHandler)}>Bubble Sort</button>
          {/* <button className = 'array-buttons' disabled = {this.state.waitForClick} onClick={() => this.testSortingAlgorithms()}>
            Test Sorting Algorithms
          </button> */}
        </div>
        <div className= 'array-sizes'>
          <h4>Array Size:</h4>
          <form name = 'size-submit' onSubmit={this.handleSubmit}>
            <label htmlFor="array-size"></label>
            <input  name="array-size" className = "sorting" id="array-size" type="number" value= {this.state.numOfArrayBars} min="2.00" max = "100.00" step="1.00" onChange={this.handleChange}></input>
            <input className = "sorting" type="submit" value="Submit" />
          </form>
         
        </div>
        <div className = 'array-sorting-speeds'>
          <h4>Sorting Speeds</h4>
          <form name = 'speed-submit' onSubmit={this.handleSubmit}>
            <label htmlFor="array-speed"></label>
            <input  name="array-speed" className = "sorting" id="array-speed" type="number" value= {this.state.animationSpeed} min="1.00" max = "27.00" step="1.00" onChange={this.handleChange}></input>
            <input className = "sorting" type="submit" value="Submit" />
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
//USED FOR TESTING
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
    //Delay until end of sorting plus additional delay to extend past the end of the sorting algorithms. 
  },(animationSpeed *length)+constants.ADDED_DELAY);
}