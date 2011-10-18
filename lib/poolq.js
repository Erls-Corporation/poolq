
/*!
 *
 *
 * POOLQ
 *
 *
 */

// poolq(){}
module.exports = poolq = function() {};

// queue an item
poolq.add = function(title, when, method) {
  if (poolq.queue === undefined) {
    poolq.queue = [];
    poolq.erroredOut = [];
    poolq.errors = false;
  }
  poolq.queue[when] = {
    title : title,
    method : method
  }
};

// setup queue management
var jobTicker = setInterval(function() {
  var currentTime = new Date().getTime();
  if (poolq.queue[currentTime] !== undefined) {
    try {
      poolq.queue[currentTime].method.call(this, this.arguments);
    } catch(error) {
      poolq.erroredOut.push(poolq.queue[currentTime]);
      poolq.queue[currentTime].error = error.message;
      console.log("error!");
    } finally {
      // DONE.
    }
  }
}, 1);

// keep an eye on errors just for skeleton testing
var errorTicker = setInterval(function() {
  if (poolq.erroredOut.length > 0) {
    poolq.errors = true;
  };
}, 1);

/* EOF */