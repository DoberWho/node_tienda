const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


let app = express()
const port = process.env.PORT || 3000
  
const MONGODB = 'mongodb://localhost:27017/tienda'
mongoose.connect(MONGODB, { useNewUrlParser: true })
.then(()=> { console.log('OK: '+MONGODB)})
.catch(()=> { console.log('Error: '+MONGODB)}) 

app.listen(port) 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
 
app.use('/categoria', require('./categoria/categoria.route') ) 
app.use('/etiqueta',  require('./etiqueta/etiqueta.route') ) 

console.log('Escuchando Puerto: ' + port) 