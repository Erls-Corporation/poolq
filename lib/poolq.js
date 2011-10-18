
/*!
 *
 *
 * POOLQ
 *
 *
 */

// core/express
var express = require("express");

// poolq(){}
module.exports = poolq = function() {};

// queue an item
poolq.add = function(title, when, fn) {
  poolq.queue[when] = {
    title : title,
    when : when,
    fn : fn
  }
};

// privates
poolq.queue = [];
poolq.erroredOut = [];
poolq.errors = false;

// setup queue management
var jobTicker = setInterval(function() {
  var currentTime = new Date().getTime();
  if (poolq.queue[currentTime] !== undefined) {
    try {
      poolq.queue[currentTime].fn.call(this, this.arguments);
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

// setup our server
var app = express.createServer();

// Configuration
app.configure(function() {
  app.use(express.logger({ format: ":method :url :status" }));
  app.use(express.static(__dirname + "/../public"));
  app.set("views", __dirname+"/../views");
  app.set("view engine", "ejs");
  app.use(express.bodyParser());
});

// default
app.get("/jobs", function(request, response) {
  var result = [];
  for (item in poolq.queue) {
    poolq.queue[item].fn = poolq.queue[item].fn;
    result.push(poolq.queue[item]);
  };
  response.send(result);
});

// errors
app.get("/errors", function(request, response) {
  response.send(poolq.erroredOut);
});

// listen
poolq.listen = function(port) {
  port = port || 8081;
  app.listen(port);
  console.log("> POOLQ running...");
}

/* EOF */