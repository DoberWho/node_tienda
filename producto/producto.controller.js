const model = require("./producto.model")
const mCat  = require("../categoria/categoria.model")
const mTag  = require("../etiqueta/etiqueta.model")
let mongo = require('mongodb')
let ObjectId = mongo.ObjectID;
 

exports.get = async function (req, res, next) { 

    const body = req.body;
    const query = req.query;
    const params = req.params;
  
    console.log("BODY: "+body);
    
    //const items = await model.find({}, {_id:1, name:1}) 
    let options = {}
    let items = await model.find(options).populate('categoria etiquetas')
    
    items = items.map(model.parse)  

    let code = 200 
    return res.status(code).json(items);
}

exports.post = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params; 
 
    let obj = new model()

    obj.name = body.name
    obj.description = body.description
    obj.price = body.price
    
    if (body.stock){
        obj.stock = body.stock
    }

    obj.categoria = body.categoria
    obj.etiquetas = body.etiquetas || []

   try {
    obj = await obj.save()
   } catch (error) {
    let code = 403 
    return res.status(code).json(error);
   }
    
    let code = 200 
    return res.status(code).json(obj);
}

exports.editar = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params; 

     
    let obj = {}
    let code = 200 
    return res.status(code).json(obj);
} 

exports.detail = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params; 
 
    let id = params.id
    console.log("BODY: "+id);
    let obj = await model.findById(id)
    if (!obj){
        let code = 404 
        return res.status(code).json(obj);
    }
    
    let code = 200 
    return res.status(code).json(obj);
}

exports.delete = async function (req, res, next) {

    const body = req.body; // TODO: Explicacion body, params, query
    const query = req.query;
    const params = req.params; 

    let id = params.id
    console.log("BODY: "+id); 

    let obj = await model.findById(id)
    if (!obj){
        let code = 404 
        return res.status(code).json(obj);
    }
    await obj.delete()
    
    let code = 200 
    return res.status(code).json(params);
}

exports.getByCategoria = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params; 

    let idC = params.id
    let cat
    try {
        cat = await mCat.findById(idC) 
        if (!cat){
            let code = 404 
            return res.status(code).json(idC);
        }
    } catch (error) {
        let code = 404 
        return res.status(code).json(error);
    }
    
    //const items = await model.find({}, {_id:1, name:1}) 
    let options = {
        categoria:cat
    }
    let items = await model.find(options).populate('categoria etiquetas')
    
    items = items.map(model.parse)  

    let code = 200 
    return res.status(code).json(items);
}

exports.getByTag = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params; 

    let idC = params.id
    let tag
    try {
        tag = await mTag.findById(idC) 
        if (!tag){
            let code = 404 
            return res.status(code).json(idC);
        }
    } catch (error) {
        let code = 404 
        return res.status(code).json(error);
    }
     
    let options = {
        etiquetas:tag
    }
    let items = await model.find(options).populate('categoria etiquetas')
    
    items = items.map(model.parse)  

    let code = 200 
    return res.status(code).json(items);
}