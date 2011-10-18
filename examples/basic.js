
var poolq = require("../");

var counter = 0;

var timestamp = new Date().getTime();
var oneMinuteMS = 60*60;

// works fine
poolq.add("set the counter to 1 one minute from now", timestamp+oneMinuteMS, function() {
  counter = 1;
  console.log("counter="+counter);
});

// borks, catch it and add to error queue
poolq.add("this should bork and throw an error to keep in our error pool for later execution", timestamp+(2*oneMinuteMS), function() {
  superFakeFunctionBro();
});

// express server listen
poolq.listen(9090);