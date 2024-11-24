const { response } = require('express')
const admissionModel      = require('../models/admissionModel')

//Show the list of student

const index = (req, res, next) => {
    admissionModel.find()
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

// Get single student Record

const show = (req, res, next) =>{
    let studentRegId = req.body.studentRegId
    admissionModel.findById(studentRegId)
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

// Add New Student to dataBase
const store = (req, res, next) => {

    let newStudent = new admissionModel({
        Student_Name : req.body.Student_Name,
        Phone_Number: req.body.Phone_Number,
        Class_Name: req.body.Class_Name,
        Privious_School_Name: req.body.Privious_School_Name,
        Address: req.body.Address,
        Previous_class:req.body.Previous_class,
        Age:req.body.Age,
        Father_Name:req.body.Father_Name,
        School_visit_Day:req.body.School_visit_Day,
        Integrested_Subject:req.body.Integrested_Subject,
        Day_Of_Registration:req.body.Day_Of_Registration,
        Status:req.body.Status,
        Admission_Date:req.body.Admission_Date,
        Registration_Number:req.body.Registration_Number

    })
    newStudent.save()
    .then(response =>{
        res.json({
            message: 'Student added sucessfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// update Student record
const update = (req, res, next) =>{
    let studentRegId = req.body.studentRegId
    let updateData = {
        Student_Name : req.body.Student_Name,
        Phone_Number: req.body.Phone_Number,
        Class_Name: req.body.Class_Name,
        Privious_School_Name: req.body.Privious_School_Name,
        Address: req.body.Address,
        Previous_class:req.body.Previous_class,
        Age:req.body.Age,
        Father_Name:req.body.Father_Name,
        School_visit_Day:req.body.School_visit_Day,
        Integrested_Subject:req.body.Integrested_Subject,
        Day_Of_Registration:req.body.Day_Of_Registration,
        Status:req.body.Status,
        Admission_Date:req.body.Admission_Date,
        Registration_Number:req.body.Registration_Number
    }
    admissionModel.findByIdAndUpdate(studentRegId, {$set: updateData})
    .then(response =>{
        res.json({
            message: 'Student details updated sucessfully'
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
    let studentRegId = req.body.studentRegId
    admissionModel.findByIdAndDelete(studentRegId)
    .then(response => {
        res.json({
            message : 'Student Deleted sucessfully'
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