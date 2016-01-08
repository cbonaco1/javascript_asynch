// CLOCK
function Clock() {
  // assume that the callback we pass will be called function style
  // and therefore 'this' will be window. therefore you need to pass 'this' with
  // .bind
  setInterval(this._tick.bind(this), 1000);
}

// function setInterval (callback) {
//   // ...
//     callback(); // this === window
// }
//
// function mySetInterval (callback) {
//   // ...
//     cat.callback();
//   // if you do this, you would not need .bind(this)
// }

Clock.prototype.printTime = function () {
  var time = "" + this.hours + ":" + this.minutes + ":" + this.seconds + "";
  console.log("Current Time: " + time);
};

Clock.prototype._tick = function () {
  var time_now = new Date();
  this.hours = time_now.getHours();
  this.minutes = time_now.getMinutes();
  this.seconds = time_now.getSeconds();

  this.printTime();
};

//var clock = new Clock();



// ADD TWO NUMBERS
var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback){
  if (numsLeft > 0) {
    reader.question("Enter a number: ", function(num){
      var answer = parseInt(num);
      sum += answer;
      console.log("Sum is now: " + sum);
      addNumbers(sum, (numsLeft - 1), completionCallback);
    });
    console.log("Not waiting for number");
  }
  else {
    completionCallback(sum);
  }
}

// addNumbers(0, 3, function(answer){
//   console.log("Our answer is: " + answer);
//   reader.close();
// });



// ABSURD BUBBLE SORT
function absurdBubbleSort(arr, sortCompletionCallback) {
  // global loop that keeps running until sorted.
  function untilsortedloop(didSwap) {
    if (didSwap === false) {
      // executes the callback which prints out the sorted array
      sortCompletionCallback(arr);
    }
    else {
      // executes a callback which decides swaps or not
      innerBubbleSortLoop(arr, 0, false, untilsortedloop);
    }
  }
  // runs the while true loop
  untilsortedloop(true);
}

function askIfGreaterThan(el1, el2, callback) {
  // asks for user input
  reader.question("Is " + el1 + " greater than " + el2 + "?",
    function (answer) {
      if (answer === "yes") {
        // executes a callback which returns the result
        callback(true);
      } else if (answer === "no") {
        // same
        callback(false);
      }
  });
}

function innerBubbleSortLoop(arr, i, swaps, untilsortedloop) {
    if ( i < arr.length - 1) {
      // askIfGreaterThan takes a call back which is this anon function
      // its argument (isGreaterThan) is the result (true/false) of when it's executed
      askIfGreaterThan(arr[i], arr[i + 1], function (isGreaterThan){
        if (isGreaterThan === true ) {
          // makes a swap
          console.log("Doing a swap");
          var next = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = next;
          console.log(arr);

          // keeps calling the inner loop
          // changes swaps to true so that untilsortedloop executes line 76
          innerBubbleSortLoop(arr, i + 1, true, untilsortedloop);
        } else {
          // keeps calling the inner loop but hasn't reached end of array yet
          innerBubbleSortLoop(arr, i + 1, swaps, untilsortedloop);
        }
      });
    } else if (i === (arr.length - 1)) {
      // calls until untilsortedloop with a swaps that can either be true or false
      // and then untilsortedloop figures out if it needs to come back here or if
      // it's done.
      untilsortedloop(swaps);
    }
}

// absurdBubbleSort([3, 4, 2, 1], function(sortedArray) {
//   console.log(sortedArray);
//   reader.close();
// });


// askIfGreaterThan(1, 2, function(theTruth) {
//   console.log("The truth is " + theTruth);
//   reader.close();
// });











//
