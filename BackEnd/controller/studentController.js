const { response } = require('express')
const studentModel = require('../models/studentModel')
const { getPermissionSet } = require('./permissionAssinment');

//Show the list of student

const index = async (req, res, next) => {
   
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.students.split("-").includes('RA')){

    try {
        const page = parseInt(req.query.PageNumber) || 1;
        const limit = parseInt(req.query.PageSize) || 10;
        const skip = (page - 1) * limit;
        const searchText = req.query.SearchText || '';

        let searchCondition = {};

        if (req.query.status === 'Active') {
            searchCondition.Status = true;
        } else if (req.query.status === 'Inactive') {
            searchCondition.Status = false;
        }

        if (searchText) {
            searchCondition.$or = [
                { Contact_Number: { $regex: searchText, $options: 'i' } },
                { First_Name: { $regex: searchText, $options: 'i' } },
                { Last_Name: { $regex: searchText, $options: 'i' } },
                { Registration_Number: { $regex: searchText, $options: 'i' } },
                { Class: { $regex: searchText, $options: 'i' } }
            ];
        }

        const [students, totalCount] = await Promise.all([
            studentModel.find(searchCondition).skip(skip).limit(limit),
            studentModel.countDocuments(searchCondition)
        ]);

        res.json({
            success: true,
            message: "Data retrieved successfully",
            code: 200,
            totalRecords: totalCount,
            data: students.map(student => ({
                _id: student._id,
                Class: student.Class,
                Class_Code: student.Class_Code,
                Adhar: student.Adhar,
                Contact_Number: student.Contact_Number,
                Secondary_Contact: student.Secondary_Contact,
                Father_Name: student.Father_Name,
                Mother_Name: student.Mother_Name,
                Address: student.Address,
                State: student.State,
                District: student.District,
                First_Name: student.First_Name,
                Last_Name: student.Last_Name,
                Registration_Number: student.Registration_Number,
                Password: student.Password,
                DOB: student.DOB,
                Status: student.Status,
            }))
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'An error occurred!',
            code: 500,
            error: error.message
        });
    }
}else{
    res.json({
        code: 401,
        success: true,
        message: 'You do not have the necessary permissions to access this resource. Please contact your administrator'
    })
}
}


// Get single Student Record

const show = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.students.split("-").includes('R')){

    
    let studentId = req.query.studentId;
    studentModel.findById(studentId)
        .then(data => {
            res.json({
                success: true,
                message: "Data retrieved successfully",
                code: 200,
                data:data
            })
        })
        .catch(error => {
            res.json({
                message: `${error}`,
                status:401
            })
        })
    }else{
        res.json({
            code: 401,
            success: true,
            message: 'You do not have the necessary permissions to access this resource. Please contact your administrator'
        })
    }
}



// Add student to dataBase
const store = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.students.split("-").includes('W')){

    let student = new studentModel({
        // RollNo : req.body.RollNo,  // TODO this fild note requered 
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Class: req.body.Class,
        Class_Code: req.body.Class_Code,
        Secondary_Contact: req.body.Secondary_Contact,
        Adhar: req.body.Adhar,
        Father_Name: req.body.Father_Name,
        Mother_Name: req.body.Mother_Name,
        Contact_Number: req.body.Contact_Number,
        Address: req.body.Address,
        // Performace_Update:req.body.Performace_Update, // TODO this fild note requered 
        // Exctracaricular_Activity:req.body.Exctracaricular_Activity, // TODO this fild note requered 
        Password: req.body.Password,
        Registration_Number: req.body.Registration_Number,
        DOB: req.body.DOB,
        State: req.body.State,
        District: req.body.District,
        Status: true,
    })
    student.save()
        .then(response => {
            res.json({
                success: true,
                message: 'Student added successfully!',
                code: 200
            });
        })
        .catch(error => {
            res.json({
                message: `${error}`
            });
        });
    }else{
        res.json({
            code: 401,
            success: true,
            message: 'You do not have the necessary permissions to access this resource. Please contact your administrator'
        })
    }
}

// update student record
const update = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.students.split("-").includes('E')){

    let studentId = req.body.studentId
    let updateData = {
        // RollNo : req.body.RollNo, // TODO this fild note requered
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Class: req.body.Class,
        Class_Code: req.body.Class_Code,
        Secondary_Contact: req.body.Secondary_Contact,
        Adhar: req.body.Adhar,
        Father_Name: req.body.Father_Name,
        Mother_Name: req.body.Mother_Name,
        Contact_Number: req.body.Contact_Number,
        Address: req.body.Address,
        // Performace_Update:req.body.Performace_Update, // TODO this fild note requered
        // Exctracaricular_Activity:req.body.Exctracaricular_Activity, // TODO this fild note requered
        Password: req.body.Password,
        Registration_Number: req.body.Registration_Number,
        DOB: req.body.DOB,
        State: req.body.State,
        District: req.body.District,
    }
    studentModel.findByIdAndUpdate(studentId, { $set: updateData })
        .then(response => {
            res.json({
                success: true,
                message: 'student details updated sucessfully',
                code: 200
            });
        })
        .catch(error => {
            res.json({
                message: `${error}`
            });
        });
    }else{
        res.json({
            code: 401,
            success: true,
            message: 'You do not have the necessary permissions to access this resource. Please contact your administrator'
        })
    }
}

// deactivate student record
const remove = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.students.split("-").includes('D')){

    let studentId = req.body.studentId
    let updateData = {
        // RollNo : req.body.RollNo, // TODO this fild note requered
        Status: req.body.status,
        
    }
    studentModel.findByIdAndUpdate(studentId, { $set: updateData })
        .then(response => {
            res.json({
                success: true,
                message: 'User Removed Successfully!',
                code: 200
            });
        })
        .catch(error => {
            res.json({
                message: `${error}`
            });
        });
    }else{
        res.json({
            code: 401,
            success: true,
            message: 'You do not have the necessary permissions to access this resource. Please contact your administrator'
        })
    }
}

// delete an Student

const destroy = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.students.split("-").includes('D')){

    let studentId = req.body.studentId
    studentModel.findByIdAndDelete(studentId)
        .then(response => {
            res.json({
                message: 'Student Deleted sucessfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
    }else{
        res.json({
            code: 401,
            success: true,
            message: 'You do not have the necessary permissions to access this resource. Please contact your administrator'
        })
    }
}

module.exports = {
    index, show, store, update, destroy, remove
}