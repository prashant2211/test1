const { response } = require('express')
const feeDetailsModel      = require('../models/studentFeeDetailsModel')

//Show all fee Detiails

const index = (req, res, next) => {
    feeDetailsModel.find()
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

// Get single fee Details

const show = (req, res, next) =>{
    let feeDetailId = req.body.feeDetailId
    feeDetailsModel.findById(feeDetailId)
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

// add fee details to DB
const store = (req, res, next) => {

    let feeDetails = new feeDetailsModel({
        Student_Name : req.body.Student_Name,
        Class: req.body.Class,
        Student_RollNumber: req.body.Student_RollNumber,
        Month: req.body.Month,
        Total_Pending_Fee: req.body.Total_Pending_Fee,
        Tution_fee:req.body.Tution_fee,
        Payment_status:req.body.Payment_status,
        Lumsum_Amount:req.body.Lumsum_Amount,
        Payment_Date:req.body.Payment_Date,
        Payment_Mode:req.body.Payment_Mode
    })
    feeDetails.save()
    .then(response =>{
        res.json({
            message: 'fee Payment sucessfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// update fee Details  => Not required as of now
const update = (req, res, next) =>{
    let feeDetailId = req.body.feeDetailId
    let updateData = {
        Student_Name : req.body.Student_Name,
        Class: req.body.Class,
        Student_RollNumber: req.body.Student_RollNumber,
        Month: req.body.Month,
        Total_Pending_Fee: req.body.Total_Pending_Fee,
        Tution_fee:req.body.Tution_fee,
        Payment_status:req.body.Payment_status,
        Lumsum_Amount:req.body.Lumsum_Amount,
        Payment_Date:req.body.Payment_Date,
        Payment_Mode:req.body.Payment_Mode
    }
    feeDetailsModel.findByIdAndUpdate(feeDetailId, {$set: updateData})
    .then(response =>{
        res.json({
            message: 'fee payment details updated sucessfully'
        })
    })
    .catch(error => {
        res.json({
            message: ' An error occured'
        })
    })
}

// delete fee details  => Not required as of now

const destroy = (req, res, next) =>{
    let feeDetailId = req.body.feeDetailId
    feeDetailsModel.findByIdAndDelete(feeDetailId)
    .then(response => {
        res.json({
            message : 'fee payment Deleted sucessfully'
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