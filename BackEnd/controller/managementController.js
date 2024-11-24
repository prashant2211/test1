const { response }          = require('express')
const staffSalaryModel      = require('../models/managementModel')

//Show the list of all member

const index = (req, res, next) => {
    staffSalaryModel.find()
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

// Get single member Record

const show = (req, res, next) =>{
    let managementId = req.body.managementId
    staffSalaryModel.findById(managementId)
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

// Add management Member to dataBase
const store = (req, res, next) => {

    let salaryDetails = new staffSalaryModel({
        M_Id : req.body.M_Id,
        Name: req.body.Name,
        Phone: req.body.Phone,
        Address: req.body.Address,
        Qualification: req.body.Qualification,
        Destination:req.body.Destination,
        Email:req.body.Email,
        Password:req.body.Password,
        Joining_Date:req.body.Joining_Date,
        Age:req.body.Age ,
        Adhar:req.body.Adhar,
        Salary:req.body.Salary    
    })
    salaryDetails.save()
    .then(response =>{
        res.json({
            message: 'salary Details details added sucessfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// update management menber record  
const update = (req, res, next) =>{
    let managementId = req.body.managementId
    let updateData = {
        M_Id : req.body.M_Id,
        Name: req.body.Name,
        Phone: req.body.Phone,
        Address: req.body.Address,
        Qualification: req.body.Qualification,
        Destination:req.body.Destination,
        Email:req.body.Email,
        Password:req.body.Password,
        Joining_Date:req.body.Joining_Date,
        Age:req.body.Age ,
        Adhar:req.body.Adhar,
        Salary:req.body.Salary  
    }
    staffSalaryModel.findByIdAndUpdate(managementId, {$set: updateData})
    .then(response =>{
        res.json({
            message: 'details updated sucessfully'
        })
    })
    .catch(error => {
        res.json({
            message: ' An error occured'
        })
    })
}

// delete management deteils  

const destroy = (req, res, next) =>{
    let managementId = req.body.managementId
    staffSalaryModel.findByIdAndDelete(managementId)
    .then(response => {
        res.json({
            message : 'details Deleted sucessfully'
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