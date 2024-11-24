const { response } = require('express')
const classModel      = require('../models/classModel')
const { getPermissionSet } = require('./permissionAssinment');

//Show the list of class

const index = async (req, res, next) => {

    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.classes.split("-").includes('RA')){

    classModel.find()
    .then(response => {
        res.json({
            code: 200,
            success: true,
            data: response
        })
    })
    .catch(error => {
        res.json({
            code: 500,
            success: false,
            message: error,
            error: error
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

// Get single Class Record

const show = (req, res, next) =>{
    let classId = req.body.classId
    classModel.findById(classId)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// Add Classes to dataBase
const store = (req, res, next) => {

    let classRecord = new classModel({
        Class_Code : req.body.Class_Code,
        Number_Of_Student: req.body.Number_Of_Student,
        Class_Name: req.body.Class_Name,
        Class_Teacher_Name: req.body.Class_Teacher_Name,
        Class_Teacher_Staff_Code: req.body.Class_Teacher_Staff_Code,
        Subject_List:req.body.Subject_List,
        Session_Start_Day:req.body.Session_Start_Day,
        Session_End_Day:req.body.Session_End_Day,
        Books_Details:req.body.Books_Details   
    })
    classRecord.save()
    .then(response =>{
        res.json({
            message: 'class added sucessfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// update Class record
const update = (req, res, next) =>{
    let classId = req.body.classId
    let updateData = {
        Class_Code : req.body.Class_Code,
        Number_Of_Student: req.body.Number_Of_Student,
        Class_Name: req.body.Class_Name,
        Class_Teacher_Name: req.body.Class_Teacher_Name,
        Class_Teacher_Staff_Code: req.body.Class_Teacher_Staff_Code,
        Subject_List:req.body.Subject_List,
        Session_Start_Day:req.body.Session_Start_Day,
        Session_End_Day:req.body.Session_End_Day,
        Books_Details:req.body.Books_Details 
    }
    classModel.findByIdAndUpdate(classId, {$set: updateData})
    .then(response =>{
        res.json({
            message: 'class details updated sucessfully'
        })
    })
    .catch(error => {
        res.json({
            message: ' An error occured'
        })
    })
}

// delete an Class  => Only super admin can access this feature

const destroy = (req, res, next) =>{
    let classId = req.body.classId
    classModel.findByIdAndDelete(classId)
    .then(response => {
        res.json({
            message : 'clas Deleted sucessfully'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })       
    })
}

module.exports = {
    index, show, store, update, destroy
}