const model = require("./categoria.model")
let mongo = require('mongodb')
let ObjectId = mongo.ObjectID;

exports.filtroCategoria = function (obj){  

    if (obj == null) return false
    if (obj == undefined) return false 

    if (!obj) return false
    if (!obj.name) return false 

    return (obj.name.includes('Cat'))
} 

exports.get = async function (req, res, next) { 

    const body = req.body;
    const query = req.query;
    const params = req.params;
  
    console.log("BODY: "+body);
    
    //const items = await model.find({}, {_id:1, name:1}) 
    let options = {}
    let items = await model.find(options)
 
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
    obj = await obj.save()
    
    let code = 200 
    return res.status(code).json(obj);
}

exports.editar = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params; 

    let id = body._id
   
    /// ===================== FORMA 1 de Editar
    let ObjectId = require('mongodb').ObjectID;
    let obj = await model.updateOne({"_id":ObjectId(id)}, {"name":body.name})

    if (!obj || (obj.ok == 1) && (obj.n <= 0)){
        let code = 404 
        return res.status(code).json(obj);
    }
    /// =====================

    /// ===================== FORMA 2 de Editar
    obj = await model.findById(id)
    if (!obj){
        let code = 404 
        return res.status(code).json(obj);
    }
    obj.name = body.name
    await obj.save()
    /// ===================== 

    
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