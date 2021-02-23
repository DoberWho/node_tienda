const model = require("./carrito.model")
let mongo = require('mongodb')
let ObjectId = mongo.ObjectID;

exports.get = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;
   
    let idUsuario = req.usuario._id 
    let item = await model.findOne({usuario:idUsuario}).populate("productos.producto")
    if (!item){
        item = new model()
        item.usuario = idUsuario
        item.productos = [] 
        item = await item.save() 
    }
    item = model.parse(item)

    let code = 200 
    return res.status(code).json(item);
}

exports.post = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params; 
 
    let idUsuario = req.usuario._id 
    let carrito = await model.findOne({usuario:idUsuario})
    if (!carrito){
        carrito = new model()
        carrito.usuario = idUsuario
        carrito.productos = []  
    } 

    let arrProductos = body
    arrProductos = arrProductos.filter(cart =>{
        return (cart.cantidad > 0)
    })  

    carrito.productos = arrProductos
    carrito = await carrito.save()
    
    let code = 200 
    return res.status(code).json(carrito);
} 

exports.delete = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params; 

    let id = req.usuario._id 
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

exports.test = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;
  
    let items = ["AB", "BC", "CD", "ABC", "ACBD", "ADFE", "DF", "FE"]

    let secundario = items.filter((item)=>{
        console.log(item)
        return (item.includes('B'))
    })
    console.log(secundario)

    items.forEach(item=>{
        console.log(item)
    })

    let tercio = items.map(item=>{
        return item.toLowerCase()
    })
    console.log(tercio)

  

    let code = 200 
    return res.status(code).json(secundario);
}