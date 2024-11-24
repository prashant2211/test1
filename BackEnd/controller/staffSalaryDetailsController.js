const { response } = require('express')
const salaryModel = require('../models/StaffSalaryDetails')


// Add payment details
const store = (req, res, next) => {

    
        let salaryDetails = new salaryModel({
            Staff_Code                   : req.body.staff_code.trim(),
            Staff_Name                   : req.body.employee_name,
            Phone                        : req.body.phone,
            Account_Number               : req.body.account_number,
            IFSC_Code                    : req.body.IFSC_code,
            Branch_Name                  : req.body.branch_name,
            Pan_Number                   : req.body.pan_number,
            Adhar_Number                 : req.body.adhar_number,
            PF_Number                    : req.body.pf_Number,
            PF_Amount                    : req.body.pf_Amount,
            Medical_Insurance            : req.body.medical_insurance,
            Children_Education_Allowance : req.body.children_education_allowance,
            Leave_Travel_Allowance       : req.body.leave_travel_allowance,
            Meal_Allowance               : req.body.meal_allowance,
            Medical_Allowance            : req.body.medical_allowance,
            Variable_Pay                 : req.body.variable_pay,
            CTC                          : req.body.ctc,
            Monthly_Salary               : req.body.monthly_salary,
            Pending_Amount               : req.body.pending_amount
        })
        salaryDetails.save()
            .then(response => {
                res.json({
                    success: true,
                    message: 'Salary Details added Successfully!',
                    code: 200
                });
            })
            .catch(error => {
                if (error.code === 11000) {
                    res.json({
                        success: false,
                        message: 'Duplicate record found!',
                        code: 409
                    });
                }else{
                    res.json({
                        success: false,
                        message: `${error}`,
                        code: 500
                    });
                }
                
            });
    }



// Get payment Record

const show = (req, res, next) => {
    let empId = req.query.staff_code;
    salaryModel.findOne({ Staff_code: empId })  // Use findOne to query by staff_code
        .then(data => {
            if (data) {
                res.json({
                    success: true,
                    message: "Data retrieved successfully",
                    code: 200,
                    data: data
                });
            } else {
                res.json({
                    success: false,
                    message: "No data found",
                    code: 404
                });
            }
        })
        .catch(error => {
            res.json({
                message: `${error}`,
                status: 500
            });
        });
};




    module.exports = {
         show, store
    }