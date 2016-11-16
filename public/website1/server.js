var express = require('express')
var app = express()
var fallback = require('express-history-api-fallback');
var root = __dirname ;

  app.use(express.static(root));
  app.use(fallback('index.html', { root: root }))
  
  app.listen(process.env.PORT, function (err, result) {
    if (err) {
      console.log(err);
    }
     
    console.log('Running at:',process.env.PORT);
  });
