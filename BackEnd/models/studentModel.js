const mongoose      = require('mongoose')
const { type } = require('os')

const Schema        = mongoose.Schema

const studentSchema = new Schema({
    RollNo:{
        type: String
    },
    Class:{
        type: String
    },
    Class_Code:{
        type: String
    },
    Father_Name: {
        type: String
    },
    Mother_Name: {
        type: String
    },
    Contact_Number: {
        type: String
    },
    Secondary_Contact: {
        type: String
    },
    Address: {
        type: String
    },
    Performace_Update: {
        type: String
    },
    Exctracaricular_Activity: {
        type: String
    },
    Password: {
        type: String
    },
    Registration_Number: {
        type: String
    },
    State: {
        type: String,
        required: true
    },
    District: {
        type: String,
        required: true
    },
    Last_Name: {
        type: String,
        required: true
    },
    First_Name: {
        type: String,
        required: true
    },
    Adhar: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    
   Status: {
    type: Boolean,
    required: true
}
},
{timestamps:true}
)

studentSchema.index({ RollNo: 1, Registration_Number: 1, Adhar: 1}, { unique: true });

const Student = mongoose.model('Student',studentSchema)

module.exports = Student; 