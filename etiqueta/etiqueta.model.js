'use strict';
let mongoose = require('mongoose'); 
let Schema = mongoose.Schema;

const opts = {
    name: {
      type: String,
      lowercase:true,
      trim:true
    },
}
const params = { timestamps: true }
let schema = new Schema(opts, params);

let model = mongoose.model('etiqueta', schema);

model.parse = function (obj){

  let data = {}
  data['name'] = obj.name
  data['_id'] = obj._id

  return data
}

module.exports = model

