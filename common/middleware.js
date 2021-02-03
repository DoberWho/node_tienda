const jwt = require('jsonwebtoken');

exports.verifyToken = async function(req, res, next){

    let token = req.headers['Authorization']
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