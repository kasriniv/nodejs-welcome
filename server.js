var express = require('express');
var os = require("os");
var cors = require('cors');
const PORT = 8080;
const app = express();
//console.log(process.env)

var healthy=true;
//this is for JSON const bodyParser = require('body-parser');

var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
app.use(bodyParser.xml());
//THIS IS IF BODY IS JSON, IN MY CASE IT IS XML app.use(bodyParser.json());



app.get('/', function (req, res) {
  console.log(req.headers);
  res.send('Hello world v.1.1 ' + os.hostname() + '\n');
});



app.get('/healthz', function (req, res) {
  console.log('health enquiry')
  if(healthy)
   res.send('OK');
  else
   res.status(404).send('NOT OK');
});


app.get('/cancer', function (req, res) {
   healthy=false;
   res.send('Killed ' + os.hostname());
});

app.post('/kpost', function (req, res) {
  console.dir(req.body);
console.log(req.body);

   res.send('post all good ' + os.hostname());
});

app.listen(PORT,'0.0.0.0');
console.log('Running on http://localhost:' + PORT);


process.on('SIGTERM', function () {
    console.log('Cleanup.....');
    process.exit();
});
