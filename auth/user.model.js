'use strict';
let mongoose = require('mongoose');  
let Schema = mongoose.Schema;
let moment = require('moment')

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
  birth:{
    type:Date,
    default: Date.now
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

schema.methods.isValidPassword = async function(password){
  const user = this; 
  return (user.password == password)
}

model.isValidPassword = async function(userPassword, password){  
  return (userPassword == password)
}

model.getPassword = function(password){  
  return password;
}

model.parse = function (obj){

  obj = JSON.parse( JSON.stringify( obj ) );

  let data = {}
  let keys = Object.keys(obj);  

  keys.forEach(key=>{  
    if (key.includes('password')) return;
    if (key.includes('__v')) return;
    if (key.includes('birth')){
      data[key] = moment(obj[key]).format('DD-MM-YYY')
      return
    }
    data[key] = obj[key] 
  })  

  return data
}

module.exports = model

