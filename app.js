var express = require('express');
var bodyparser = require('body-parser');
var expressjwt = require('express-jwt');
var cors = require('cors');
var path = require('path');
var os = require("os");
//agregadas despues de descargado de git

var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.use(express.static('public'));
app.set('port', (process.env.PORT || 5000))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
/*app.use(expressjwt({secret:'secreto'})
   .unless({path:[
      '/auth/login'
   ]}));*/

var connection = require('./connection');
var routes = require('./routes/routes');


connection.inicia();
routes.configurar(app);
/*
var server = app.listen(8000, function() {
   console.log('Escuchando en el puerto ', server.address().port);
})
*/
var hostname = os.hostname();
var server = app.listen(app.get('port'), function() {
  console.log("Node app is running at "+ hostname + " en el puerto " + app.get('port'))
})
