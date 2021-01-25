const model = require("./categoria.model")

exports.filtroCategoria = function (obj){
    if (!obj) return false
    if (!obj.name) return false 

    if (obj == null) return false
    if (obj == undefined) return false
    if (!obj) return false 

    return (obj.name.includes('Cat'))
}

exports.get = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;
  
    console.log("BODY: "+body);
    
    //const items = await model.find({}, {_id:1, name:1}) 
    let items = await model.find({})
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
    await obj.delete()
    
    let code = 200 
    return res.status(code).json(params);
}