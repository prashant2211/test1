
const User          = require('../models/User')
const bcrypt        = require('bcryptjs')
const jwt           = require('jsonwebtoken')
const { use } = require('../routes/studentRoute')
const { getPermissionSet } = require('./permissionAssinment');



const register = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.users.split("-").includes('W')){

    bcrypt.hash(req.body.Password, 10, function(err, hashedPass) {
        if(err){
            res.json({
                error: err
            })
        }
        let user = new User ({
            FirstName : req.body.Firstname,
            LastName : req.body.LastName,
            Email : req.body.Email,
            Phone : req.body.Phone,
            UserName : req.body.UserName,
            InstutionCode : req.body.InstutionCode,
            MemberId: req.body.MemberId,
            UserType: req.body.UserType,
            PermissionSet : req.body.PermissionSet,
            Password : hashedPass
        })
        user.save()
        .then(user => {
            res.json({
                success: true,
                message: "User Added Sucessfully",
                code: 201
               
            })
        })
        .catch(error => {
            res.json({
                success: false,
                message : error,
                code: 500,
            })
        })
    })
}else{
    res.json({
        code: 401,
        success: true,
        message: 'You do not have the necessary permissions to access this resource. Please contact your administrator'
    })
}

   
}

const login = (req, res, next)=> {
    var username = req.body.username
    var password = req.body.password
    User.findOne({$or: [{Email:username},{Phone:username},{UserName:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.Password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({FirstName: user.FirstName, Phone: user.Phone, UserName: user.UserName, InstutionCode: user.InstutionCode, UserType: user.UserType, PermissionSet: user.PermissionSet, Email: user.Email, MemberId: user.MemberId, userId: user._id }, 'verySecretValue', {expiresIn : '24h'})
                    let refreshtoken = jwt.sign({FirstName: user.FirstName, Phone: user.Phone, UserName: user.UserName, InstutionCode: user.InstutionCode, UserType: user.UserType, PermissionSet: user.PermissionSet, Email: user.Email, MemberId: user.MemberId, userId: user._id}, 'verySecretValue1', {expiresIn : '24h'})
                    const responseUser = {
                        _id: user._id,
                        FirstName: user.FirstName,
                        LastName: user.LastName,
                        email: user.Email,
                        UserName: user.UserName,
                        token: token,
                        refreshtoken: refreshtoken,
                    }
                    res.json({
                        success: true,
                        message: 'Login Successful',
                        data:responseUser,
                        code: 200,
                    })
                }else{
                    res.json({
                        success: true,
                        message : 'Password does not matched!',
                        code: 200,
                    });
                }
            })
        }else{
            res.json({
                message: 'no user found !',
                success: false,
                code: 500,
            })
        }
    })
}


const refreshToken = (req, res, next) =>{
    const refreshToken = req.body.refreshtoken;
    jwt.verify(refreshToken,'verySecretValue1' ,function(err, decode) {
        if(err){
            res.status(400).json({
                success: false,
                err
            })
        }else{

            let token = jwt.sign({FirstName: decode.FirstName}, 'verySecretValue', {expiresIn: '60s'})
            let refreshToken = req.body.refreshtoken
            res.status(200).json({
                message : 'token refreshed successfully !',
                success: true,
                token,
                refreshToken
            })
        }
    })
}

module.exports = {
    register, login, refreshToken
}