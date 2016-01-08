function absurdTimes(numTimes, fun) {
  var i = 0;

  function loopStep() {
    if (i == numTimes) {
      // we're done, stop looping
      return;
    }

    fun();

    // recursively call loopStep
    i += 1;
    loopStep();
  }

  loopStep();
}

absurdTimes(5, function(){
  console.log("Enter absurdTimes");
});
