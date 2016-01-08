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




// .APPLY
// in the call to someMethod, `this` is cat
// 2 arguments: cat and an array of arguments
// someMethod.apply(cat, [something, somethingElse])

// .CALL
// in the call to someMethod, `this` is cat
// cat + an infinite amount of other arguments (like Ruby *)
// someMethod.call(cat, something, somethingElse)

Function.prototype.myBind = function (context, args) {
  // context = cat
  // fn is bark or dog or dog.bark

  // .bind should return a function
  // the 'this' of that functions should be context
  // it can have a sequence of args after

  fn = this;
  var func = function(){
    fn.apply(context, [args]);
  };

  return func;
};



// code to test myBind
// function Lamp() {
//    this.name = "a lamp";
// }
//
// var turnOn = function() {
//    console.log("Turning on " + this.name);
// };
//
// var lamp = new Lamp();
//
// turnOn(); // should not work the way we want it to
//
// var boundTurnOn = turnOn.bind(lamp);
// var myBoundTurnOn = turnOn.myBind(lamp);
//
// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"



// TOWERS OF HANOI

// // Keep three arrays, which represents the piles of discs. Pick a representation of the
// discs to store in the arrays; maybe just a number representing their size.
// Don't worry too much about making the user interface pretty.
// //
// // In a loop, prompt the user (using gets) and ask what pile to select a disc from,
// and where to put it.
// //
// // After each move, check to see if they have succeeded in moving all the discs,
// to the final pile. If so, they win!
// //

// class HanoiGame
//   def initialize
//     @towers = [[], [], []]
//   end
//
//   def prompt_move
//   end
// end

// this is how you define what is like @instance_variables
function HanoiGame(numDiscs) {
  this.towers = [[], [], []];

  for (var i = 0; i < numDiscs; i++) {
    this.towers[0].unshift(i + 1);
  }
}

// this is how you defined what is like instance_methods
HanoiGame.prototype.promptMove = function (callback) {
  game = this;
  console.log(game.towers);

  reader.question("Where from?", function (from_t) {
    reader.question("Where to?", function (to_t) {
      console.log("game is " + game);
      debugger
      game.callback(from_t, to_t);
    });
  });
};

HanoiGame.prototype.isValidMove = function (from_tower, to_tower) {
  //if from_town is emtpy
  if (this.towers[from_tower].length === 0) {
    console.log("not valid1");
    return false;
  }
  //if last disc in to_tower < disc in from_tower
  else{
    var discToMove = this.towers[from_tower][this.towers[from_tower].length - 1];
    var destDisc = this.towers[to_tower][this.towers[to_tower].length - 1];
    if (discToMove > destDisc) {
      console.log("not valid2");
      return false;
    }
    else {
      console.log("yoohoo");
      return true;
    }
  }
  // return valid;
};

game = new HanoiGame(4);

game.promptMove(game.isValidMove);

































//
