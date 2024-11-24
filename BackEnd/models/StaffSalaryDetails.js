const mongoose      = require('mongoose')
const { type }      = require('os')

const Schema        = mongoose.Schema

const staffSalaryDetailsSchema = new Schema({
    Staff_Code:{
        type: String
    },
    Staff_Name : {
        type: String
    },
    Phone : {
        type: String
    },
    Account_Number : {
        type: String
    },
    IFSC_Code : {
        type: String
    },
    Branch_Name : {
        type: String
    },
    Pan_Number : {
        type: String
    },
    Adhar_Number : {
        type: String
    },
    PF_Number : {
        type: String
    },
    PF_Amount : {
        type: Number
    },
    Medical_Insurance : {
        type: Number
    },
    Children_Education_Allowance : {
        type: Number
    },
    Leave_Travel_Allowance: {
        type: Number
    },
    Meal_Allowance: {
        type: Number
    },
    Medical_Allowance: {
        type: Number
    },
    Variable_Pay: {
        type: Number
    },
    CTC : {
        type: Number
    },
    Monthly_Salary : {
        type: Number
    },
    Pending_Amount : {
        type: Number
    },
 
},
{timestamps:true}
)


staffSalaryDetailsSchema.index({ Employee_Code: 1, Phone: 1, Account_Number: 1 }, { unique: true });

// Create the model
const salaryPaymentModel = mongoose.model('Staff_Salary_Details', staffSalaryDetailsSchema);

module.exports = salaryPaymentModel;