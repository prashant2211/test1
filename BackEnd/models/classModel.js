const mongoose      = require('mongoose')
const { type } = require('os')

const Schema        = mongoose.Schema

const classSchema = new Schema({
    Class_Code:{
        type: String
    },
    Number_Of_Student : {
        type: Number
    },
    Class_Name : {
        type: String
    },
    Class_Teacher_Name : {
        type: String
    },
    Class_Teacher_Staff_Code:{
        type: String
    },
    Subject_List: {
        type: Array
    },
    Session_Start_Day: {
        type: Date
    },
    Session_End_Day: {
        type: Date
    },
    Books_Details: {
        type: Array
    }
    
},
{timestamps:true}
)
classSchema.index({ Class_Code: 1}, { unique: true });

const Class = mongoose.model('Class',classSchema)

module.exports = Class; 