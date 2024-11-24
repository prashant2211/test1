const mongoose      = require('mongoose')
const { type } = require('os')

const Schema        = mongoose.Schema

const instutionSchema = new Schema({
    Instution_Id:{
        type: String
    },
    Instution_Name:{
        type: String
    },
    ChairMan_Name:{
        type: String
    },
    Registration_Id: {
        type: String
    },
    Affiliation: {
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
    instution_Type: {
        type: String
    },
    Director_Name: {
        type: String
    },
    Registar_Name: {
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
    Management_Member: {
        type: Array,
        required: true
    },
    
   Status: {
    type: Boolean,
    required: true
}
},
{timestamps:true}
)

instutionSchema.index({ Instution_Id: 1, Registration_Id: 1}, { unique: true });

const Student = mongoose.model('Instution',instutionSchema)

module.exports = Student; 