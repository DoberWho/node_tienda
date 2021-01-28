const model = require("./user.model")
let mongo = require('mongodb')
let ObjectId = mongo.ObjectID;

exports.register = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;
  
    console.log("BODY: "+body); 

    let user = new model()
    user.email = body.email

    const hPass = await model.getPassword(body.password);
    user.password = hPass
    user.name = body.name
    user.lastname = body.lastname
    user = await user.save()

    let data = model.parse(user)
    let code = 200 
    return res.status(code).json(data);
}

exports.login = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;
  
    console.log("BODY: "+body);
   

    let data = {}
    let code = 200 
    return res.status(code).json(data);
}

exports.editar = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;
  
    console.log("BODY: "+body);
   

    let data = {}
    let code = 200 
    return res.status(code).json(data);
}
 
exports.detail = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;
  
    console.log("BODY: "+body);
   

    let data = {}
    let code = 200 
    return res.status(code).json(data);
}

exports.get = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;
  
    console.log("BODY: "+body);
   

    let data = {}
    let code = 200 
    return res.status(code).json(data);
}

exports.delete = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;
  
    console.log("BODY: "+body);
   

    let data = {}
    let code = 200 
    return res.status(code).json(data);
}