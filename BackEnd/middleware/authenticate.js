const jwt       = require('jsonwebtoken');
const { token } = require('morgan');

const authenticate  = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ') [1];
        const decode = jwt.verify(token, 'verySecretValue')

        req.user = decode
        next()
    }
    catch (error){

        if(error.name == 'TokenExpiredError'){
            res.status(401).json({
                message: 'Token Expired !'
            })
        }else{
            res.status(401).json({
                message : 'Authentication Failed !',
                status :401
            });
        }
       
    }
}

module.exports = authenticate;