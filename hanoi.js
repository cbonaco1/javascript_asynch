
var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function HanoiGame(numDiscs) {
  this.towers = [[], [], []];
  this.totalDiscs = numDiscs;

  for (var i = 0; i < numDiscs; i++) {
    this.towers[0].unshift(i + 1);
  }
}

// this is how you defined what is like instance_methods
HanoiGame.prototype.promptMove = function (moveCallback) {
  var game = this;

  game.print();

  reader.question("Where from? ", function (fromT) {
    reader.question("Where to? ", function (toT) {
      // option 1
      // moveCallback.call(game, fromT, toT);
      // option 2
      // moveCallback.bind(game)(fromT, toT);
      // option 3
      // here the callback is called function style and relies on the value of 'this'
      // so 'this' needs to be bound when it's passed to promptMove (line 97)
      moveCallback(fromT, toT);
    });
  });
};

HanoiGame.prototype.isValidMove = function (fromTowerNum, toTowerNum) {
  var fromTower = this.towers[fromTowerNum];
  var toTower = this.towers[toTowerNum];


  if (fromTower.length === 0) {
      console.log("not valid1");
      return false;
  }
  //if last disc in toTower < disc in fromTower
  else{
    var discToMove = fromTower[this.towers[fromTowerNum].length - 1];
    var destDisc = toTower[this.towers[toTowerNum].length - 1];

    if (discToMove > destDisc) {
      console.log("not valid2");
      return false;
    }
    else {
      console.log("valid");
      return true;
    }
  }
};

HanoiGame.prototype.move = function (startTNum, endTowerNum) {
  var fromTower = this.towers[startTNum];
  var toTower = this.towers[endTowerNum];

  if (this.isValidMove(startTNum, endTowerNum)) {
    var piece = fromTower.pop();
    toTower.push(piece);
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.print = function () {
  var result = JSON.stringify(this.towers);
  console.log(result);
};

HanoiGame.prototype.isWon = function () {
  var won = false;

  if ( (this.towers[1].length === this.totalDiscs) ||
      (this.towers[2].length === this.totalDiscs) ) {
      console.log("Game is won!");
      won = true;
      return won;
  }
  else {
    return won;
  }
};

HanoiGame.prototype.run = function (completionCallback) {
  this.promptMove(function(fromTower, toTower){
    var moved = this.move(fromTower, toTower);

    if (moved && this.isWon()){
      completionCallback();
    } else {
      game.run(completionCallback);
    }
  }.bind(this));
  // need to bind because callback is called function style in promptMove
};

game = new HanoiGame(3);
// game.move(0, 2);
game.run( function () {
  console.log("the game is over");
  reader.close();
});














//
