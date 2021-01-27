'use strict';
let mongoose = require('mongoose'); 
let Schema = mongoose.Schema;

const opts = {
  email: {       
    type: String, 
    unique:true,
    lowercase:true,
    trim:true,
    required: [true, 'ERROR_REQUIRED']
  },
  password: {
    type: String,
    required: [true, 'ERROR_REQUIRED']
  },  
  name:  {
    type: String, 
    trim:true
  },
  lastname:  {
      type: String, 
      trim:true
  },
  role:{
    type:String,
    trim:true,
    default: "user",
    enum: ["user", "admin"]
  },
}
const params = { timestamps: true }
let schema = new Schema(opts, params);

let model = mongoose.model('user', schema);

model.parse = function (obj){

  let data = {}
  let keys = Object.keys(obj); 

  keys.forEach(key=>{  
    data[key] = obj[key] 
  })

  return data
}

module.exports = model

