const mongoose      = require('mongoose')
const { type } = require('os')

const Schema        = mongoose.Schema

const admissionSchema = new Schema({
    Student_Name:{
        type: String
    },
    Phone_Number : {
        type: String
    },
    Class_Name : {
        type: String
    },
    Privious_School_Name : {
        type: String
    },
    Address:{
        type: String
    },
    Previous_class: {
        type: String
    },
    Age: {
        type: Number
    },
    Father_Name: {
        type: String
    },
    School_visit_Day: {
        type: Date
    },
    Integrested_Subject: {
        type: Array
    },
    Day_Of_Registration: {
        type: Date
    },
    Status: {
        type: String
    },
    Admission_Date: {
        type: Date
    },
    Registration_Number: {
        type: String
    },
    
},
{timestamps:true}
)

const Class = mongoose.model('Admission',admissionSchema)

module.exports = Class; 