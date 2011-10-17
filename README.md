
poolq
=====

```bash
npm install poolq
```

```javascript
var poolq = require("poolq");

poolq.add({
  title : "say hi",
  method : function() {
    console.log("hi");
  }
});

poolq.listen(9090);

/* EOF */
```