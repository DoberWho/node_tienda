'use strict';
let mongoose = require('mongoose'); 
let Schema = mongoose.Schema;

const opts = {
    name: {
      type: String,
      unique:true,
      lowercase:true,
      trim:true, 
      required: [true, 'ERROR_REQUIRED']  
    },
    description: {
      type: String,
      lowercase:true,
      trim:true
    },
    price:{
      type:Number,
      min:0
    },
    stock:{
      type:Number, 
      default:1
    },
    categoria: { 
      type:mongoose.Schema.Types.ObjectId,
      ref: 'category'
    },
    etiquetas: [{ 
      type:mongoose.Schema.Types.ObjectId,
      ref: 'etiqueta'
    }]
    
}
const params = { timestamps: true }
let schema = new Schema(opts, params);

let model = mongoose.model('producto', schema);

model.parse = function (obj){
  return JSON.parse( JSON.stringify( obj ) );
}

module.exports = model

