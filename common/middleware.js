const jwt = require('jsonwebtoken');

exports.getToken = function(req){
   
    let token = req.headers['Authorization']
    if (!token){
        token = req.headers['authorization']
    } 

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
    
    return token
}

exports.verifyToken = async function(req, res, next){
 
    let token = exports.getToken(req)
    console.log(req.headers)
    if (!token){
        let data = {
            message: 'NO_TOKEN'
        }
        return res.status(401).json(data);
    }

    jwt.verify(token,'HolaMundo.1', function(err, data){

        if (err){
            console.err(err)
            let data = {
                message: 'TOKEN_NOT_VALID'
            }
            return res.status(401).json(data);
        }

        req.decoded = data
        next()

    })

}