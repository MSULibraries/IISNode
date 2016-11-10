var express = require('express')
var app = express()

  app.use(express.static('./'))
  
  app.listen(process.env.PORT, function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at:',process.env.PORT);
  });
