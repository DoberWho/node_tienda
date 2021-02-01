'use strict';
let mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')
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

schema.methods.isValidPassword = async function(password){
  const user = this; 
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

model.isValidPassword = async function(userPassword, password){ 
  const compare = await bcrypt.compare(password, userPassword);
  return compare;
}

model.getPassword = function(password){ 
  const hPassword = bcrypt.hashSync(password, 10);
  return hPassword;
}

model.parse = function (obj){

  obj = JSON.parse( JSON.stringify( obj ) );

  let data = {}
  let keys = Object.keys(obj); 

  keys.forEach(key=>{  
    data[key] = obj[key] 
  })

  return data
}

module.exports = model

