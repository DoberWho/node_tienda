const model = require("./user.model")
let mongo = require('mongodb')
let jwt = require('jsonwebtoken');
let ObjectId = mongo.ObjectID;

exports.register = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;
  
    console.log("BODY: "+body); 

    let user = new model() // TODO: Explicación
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
    let email = body.email
    let passw = body.password

    let opts = {
        email: email // TODO: Explicación
    }
    let user = await model.findOne(opts) // TODO: Explicación Await
    if (!user){
        let code = 404
        return res.status(code).json(null)
    }

    const isValid = await model.isValidPassword(user.password, passw)
    if (!isValid){
        let code = 401
        return res.status(code).json(null)
    }

    user = model.parse(user) // TODO: Explicacion
    delete user.email;     

    let token = jwt.sign(user, 'HolaMundo.1',  { expiresIn: '365d' })
  
    let code = 200 
    return res.status(code).json(token);
    
}

exports.editar = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;
    const decoded = req.decoded

    let id = decoded._id || decoded.id

    let user = await model.findById(id)
    
    user.name = body.name
    user.lastname = body.lastname 

    let data = model.parse(user)
    let code = 200 
    return res.status(code).json(data);
}
 
exports.detail = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;
  
    console.log("BODY: "+body);
   

    let data = model.parse(user)
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