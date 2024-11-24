const mongoose      = require('mongoose')
const { type }      = require('os')

const Schema        = mongoose.Schema

const managementSchema = new Schema({
    M_Id:{
        type: String
    },
    Name : {
        type: String
    },
    Phone : {
        type: String
    },
    Address : {
        type: String
    },
    Qualification:{
        type: String
    },
    Destination: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    Joining_Date: {
        type: Date
    },
    Age: {
        type: Number
    },
    Adhar: {
        type: String
    },
    Salary: {
        type: Number
    }
    
},
{timestamps:true}
)

managementSchema.index({ M_Id: 1, Phone: 1, Email: 1}, { unique: true });

const Class = mongoose.model('ManagementDetails',managementSchema)

module.exports = Class; 