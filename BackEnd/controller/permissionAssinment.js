const { response }             = require('express')
const permissionAssinment      = require('../models/permissionAssinment')


const permissionAccess = async (req, res, next) => {
    let user = req.user;
    let permissionType = user.PermissionSet;
   
    const isBlank = (permissionType) => permissionType == null || permissionType.trim() === '';
    let permissionData;
    if (isBlank(permissionType)) {
        permissionData = data[user.UserType];  
        if (permissionData.length > 0) {
            return res.json({
                success: true,
                code: 200,
                message: 'Permissions retrieved successfully.',
                data: permissionData
            });
    } }else {
          try {
            const permissionSets = await permissionAssinment.find({ MemberCode: req.body.MemberCode  });
            if (permissionSets.length > 0) {
                return res.json({
                    code: 200,
                    success: true,
                    message: 'Permissions retrieved successfully.',
                    data: permissionSets
                });
            } else {
                return res.json({
                    code: 500,
                    success: false,
                    message: 'No permissions found for this user.',
                    data: []
                });
            }
        } catch (error) {
            console.error(`Error retrieving permission set: ${error}`);
            return res.json({
                code: 500,
                message: 'An error occurred while retrieving the permission set.',
                error: error.message
            });
        }
    }

    next();

};

/////////////////////////////////////////
const getAllPermissions = async (req, res) => {
    

    try {

        const permissionSets = await permissionAssinment.find(); // Fetch all records
        if (permissionSets.length > 0) {
            return res.json({
                success: true,
                code: 200,
                message: 'All permissions retrieved successfully.',
                data: permissionSets
            });
        } else {
            return res.json({
                success: false,
                code: 404,
                message: 'No permissions found.',
                data: []
            });
        }
    } catch (error) {
        console.error(`Error retrieving permissions: ${error.message}`);
        return res.json({
            success: false,
            code: 500,
            message: 'An error occurred while retrieving permissions.',
            error: error.message
        });
    }
};


///////////////////////////////////////


const getPermissionSet = async (req) => {
    let user = req.user;
    let permissionType = user.PermissionSet;

    const isBlank = (permissionType) => permissionType == null || permissionType.trim() === '';
    let permissionData;
    console.log(`permissionType : ${permissionType}`);
    if (isBlank(permissionType)) {
        console.log(`data[user.UserType] : ${data[user.UserType]}`)
        permissionData = data[user.UserType];
        return permissionData;  
    } else {
        // Query from the database if PermissionSet is specified MemberCode
        try {
            const permissionSets = await permissionAssinment.findOne({ MemberCode: req.body.MemberCode });
            if (permissionSets) {
                return permissionSets; 
            } else {
                return {};
            }
        } catch (error) {
            console.error(`Error retrieving permission set: ${error}`);
            throw new Error('An error occurred while retrieving the permission set.');
        }
    }
};

  


  const createPermissionSet = (req, res, next) => {
        let user = req.user;
    
    let permissionSet = new permissionAssinment({
        Assigned_user: user.userId,
        MemberCode : req.body.MemberCode,
        assinment_Date: req.body.assinment_Date,
        assined_by: user.MemberId,
        users: req.body.users,
        teachers: req.body.teachers,
        students: req.body.students,
        staffjobforms:req.body.staffjobforms,
        staff_salary_payments:req.body.staff_salary_payments,
        staff_salary_details:req.body.staff_salary_details,
        staff_salaries:req.body.staff_salaries,
        managementdetails:req.body.managementdetails ,
        instutions:req.body.instutions,
        feestructures:req.body.feestructures ,
        classes:req.body.classes,
        admissions:req.body.admissions   
    })
    permissionSet.save()
    .then(response =>{
        res.json({
            code: 200,
            success: true,
            data: permissionSet,
            message: 'Permission added sucessfully!'
        })
    })
    .catch(error => {
        res.json({
            code: 500,
            success: false,
            message: error
        })
    })
}


const updatePermissionSet = (req, res, next) =>{
    let permissionSetId = req.body.permissionSetId
    let permissionSet = new permissionAssinment({
        assinment_Date: req.body.assinment_Date,
        users: req.body.users,
        teachers: req.body.teachers,
        students: req.body.students,
        staffjobforms:req.body.staffjobforms,
        staff_salary_payments:req.body.staff_salary_payments,
        staff_salary_details:req.body.staff_salary_details,
        staff_salaries:req.body.staff_salaries,
        managementdetails:req.body.managementdetails ,
        instutions:req.body.instutions,
        feestructures:req.body.feestructures ,
        classes:req.body.classes,
        admissions:req.body.admissions   
    })
    permissionAssinment.findByIdAndUpdate(permissionSetId, {$set: permissionSet})
    .then(response =>{
        res.json({
            message: 'Permission set details updated sucessfully'
        })
    })
    .catch(error => {
        res.json({
            message: ' An error occured'
        })
    })
}

// delete an Class  => Only super admin can access this feature

const deletePermissionSet = (req, res, next) =>{
    let permissionSetId = req.body.permissionSetId
    permissionAssinment.findByIdAndDelete(permissionSetId)
    .then(response => {
        res.json({
            message : 'Permission set Deleted sucessfully'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })       
    })
}

  
module.exports = {
    createPermissionSet, deletePermissionSet, updatePermissionSet, permissionAccess, getPermissionSet, getAllPermissions
}


  // Default Permission
  let data = {
    Admin: {
      students: "R-W-E-D",
      teachers: "R-W-E-D",
      Admissions: "R-W-E-D",
      Classes: "R-W-E-D",
      instutions: "R",
      managementDetails: "R",
      Staff_salary: "R-W-E-D",
      staff_salaryDetails: "R-W-E-D",
      Staff_salary_payment_details: "R-W",
      staffJobForms: "R-W-E",
      User: "R-W-D",
      
    },
    Organisation: {
      students: "R-W-E-D",
      teachers: "R-W-E-D",
      admissions: "R-W-E-D",
      Classes: "R-W-E-D",
      instutions: "R-W-E-D",
      managementDetails: "R-W-E-D",
      staff_salary: "R-W-E-D",
      staff_salaryDetails: "R-W-E-D",
      Staff_salary_payment_details: "R-W-E-D",
      staffJobForms: "R-W-E-D",
      user: "R-W-E-D"
    },
    Student: {
      students: "R-W-E-D",
      teachers: "",
      Admissions: "",
      classes: "R",
      instutions: "",
      managementDetails: "",
      staff_salary: "",
      staff_salaryDetails: "",
      staff_salary_payment_details: "",
      staffJobForms: "",
      user: "R",
      
    },
    Teacher: {
      students: "R",
      teachers: "R",
      admissions: "",
      classes: "R",
      instutions: "R",
      managementDetails: "R",
      Staff_salary: "R",
      staff_salaryDetails: "R",
      Staff_salary_payment_details: "R",
      staffJobForms: "",
      user: "",
      
    }
  };