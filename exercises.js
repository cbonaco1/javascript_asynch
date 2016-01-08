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
      var ans = parseInt(num);
      sum += ans;
      console.log("Sum is now: " + sum);
      addNumbers(sum, (numsLeft - 1), completionCallback);
    });
    console.log("Not waiting for number");
  }
  else {
    completionCallback(sum);
  }
}

addNumbers(0, 3, function(answer){
  console.log("Our answer is: " + answer);
  reader.close();
});



// ABSURD BUBBLE SORT














//
