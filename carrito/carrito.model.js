'use strict';
let mongoose = require('mongoose'); 
let Schema = mongoose.Schema;

const opts = {
  
  usuario: { 
    type:mongoose.Schema.Types.ObjectId,
    ref: 'user',
    unique:true
  },
  productos:[
    {
      producto: { 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'producto'
      },
      cantidad:{
        type:Number, 
        default:1 
      }
    }
  ]
}
const params = { timestamps: true }
let schema = new Schema(opts, params);

let model = mongoose.model('carrito', schema);

model.parse = function (obj){
  return JSON.parse( JSON.stringify( obj ) );
}

module.exports = model

