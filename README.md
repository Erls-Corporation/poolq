
poolq
=====

```bash
npm install poolq
```

```javascript
var poolq = require("poolq");

var timestamp = new Date().getTime();
var oneMinuteFromNow = timestamp + (60*60);

poolq.add("say hi", oneMinuteFromNow, function() {
  console.log("hi");
});

poolq.listen(9090);

/* EOF */
```