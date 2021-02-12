const model = require('./auth/user.model')
const jwt = require('jsonwebtoken');

exports.isLoged = async function (req, res, next) {

    const body = req.body;
    const query = req.query;
    const params = req.params;  

    let headers = req.headers
    console.log(headers)
    
    let token = headers.authorization 

    let testToken = async function(error, decoded) {
        if (error){
            let code = 401
            return res.status(code).json(error)
        }

        let id = decoded._id
        let user
        try {
            user = await model.findById(id)
        } catch (error) {
            let code = 404
            return res.status(code).json("USER_NOT_FOUND")
        }
        if (!user){
            let code = 404
            return res.status(code).json("USER_NOT_FOUND")
        }
    
        req.usuario = user
        
        next()

    }


    jwt.verify(token, 'HolaMundo.1', testToken) 
  
}