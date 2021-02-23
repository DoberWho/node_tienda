const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

  
const MONGODB = 'mongodb://localhost:27017/tienda'
//const MONGODB = 'mongodb+srv://castelao:Test1234@castelaocluster.hbhas.mongodb.net/tienda?retryWrites=true&w=majority'
mongoose.connect(MONGODB, { useNewUrlParser: true })
.then(()=> { console.log('OK: '+MONGODB)})
.catch(()=> { console.log('Error: '+MONGODB)}) 


corsOpts = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept,X-ACCESS_TOKEN,Authorization,authorization,x-access-token');
    res.header("Access-Control-Allow-Headers", "'User-Agent','sec-ch-ua-mobile','sec-ch-ua','Referer','Accept','Content-Length', Origin, X-Requested-With, Content-Type, Accept,X-ACCESS_TOKEN,Authorization,authorization,x-access-token");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    //res.setHeader('Access-Control-Allow-Credentials', true);
    if ('OPTIONS' === req.method) {
        //respond with 200
        console.log("REQ", "OPTIONS");
        res.sendStatus(200);
      }
      else {
      //move on
        next();
      }
  }
  
  let app = express()
  app.use(corsOpts);
  app.all('*', corsOpts);
  app.use(cors({
    exposedHeaders: ['User-Agent','sec-ch-ua-mobile','sec-ch-ua','Referer','Accept','Content-Length', 'X-Foo', 'X-Bar', 'OPTIONS', 'Origin', 'Content-Type', 'X-Requested-With', 'X-ACCESS_TOKEN', 'Authorization', 'authorization', 'x-access-token'],
  }));

const port = process.env.PORT || 3001
app.listen(port) 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

let m = require('./middleware')
 
app.use('/carrito',  m.isLoged,  require('./carrito/carrito.route') ) 

app.use('/producto',  require('./producto/producto.route') ) 
app.use('/categoria', require('./categoria/categoria.route') ) 
app.use('/etiqueta',  require('./etiqueta/etiqueta.route') )  /

app.use('/auth',      require('./auth/auth.route') ) 

console.log('Escuchando Puerto: ' + port)  