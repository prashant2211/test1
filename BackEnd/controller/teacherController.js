const { response } = require('express')
const teacherModel = require('../models/teacherModel')
const { getPermissionSet } = require('./permissionAssinment');



//Show the list of teacher

const index = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.teachers.split("-").includes('RA')){

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
                { Staff_Code: { $regex: searchText, $options: 'i' } },
                { First_Name: { $regex: searchText, $options: 'i' } },
                { Last_Name: { $regex: searchText, $options: 'i' } },
                { Email: { $regex: searchText, $options: 'i' } },
                { Contact_Number: { $regex: searchText, $options: 'i' } },
                { Qualification: { $regex: searchText, $options: 'i' } },
                { Experience: { $regex: searchText, $options: 'i' } },
            ];
        }

        const [teachers, totalCount] = await Promise.all([
            teacherModel.find(searchCondition).skip(skip).limit(limit),
            teacherModel.countDocuments(searchCondition)
        ]);

        res.json({
            success: true,
            message: "Data retrieved successfully",
            code: 200,
            totalRecords: totalCount,
            data: teachers.map(teacher => ({
                _id: teacher._id,
                Staff_Code: teacher.Staff_Code,
                First_Name: teacher.First_Name,
                Last_Name: teacher.Last_Name,
                Email: teacher.Email,
                Specialised_Subject: teacher.Specialised_Subject,
                List_of_comfortable_Subject: teacher.List_of_comfortable_Subject,
                Age: teacher.Age,
                Contact_Number: teacher.Contact_Number,
                class_Code: teacher.class_Code,
                Address: teacher.Address,
                Qualification: teacher.Qualification,
                joining_Date: teacher.joining_Date,
                Adhar: teacher.Adhar,
                DOB: teacher.DOB,
                State: teacher.State,
                District: teacher.District,
                Experience: teacher.Experience,
                Status: teacher.Status
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
    
};



// Get single Teacher Record


const show = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.teachers.split("-").includes('R')){

    let teacherId = req.params.id;
    teacherModel.findById(teacherId)
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



// Add Teacher to dataBase
const store = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.teachers.split("-").includes('W')){

    let teacher = new teacherModel({
        Staff_Code: req.body.Staff_Code,
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Email: req.body.Email,
        Specialised_Subject: req.body.Specialised_Subject,
        List_of_comfortable_Subject: req.body.List_of_comfortable_Subject,
        Age: req.body.Age,
        Contact_Number: req.body.Contact_Number,
        class_Code: req.body.class_Code,
        Address: req.body.Address,
        Qualification: req.body.Qualification,
        joining_Date: req.body.joining_Date,
        Adhar: req.body.Adhar,
        DOB: req.body.DOB,
        State: req.body.State,
        District: req.body.District,
        Experience: req.body.Experience,
        Status: true,
    });
    teacher.save()
        .then(response => {
            res.json({
                success: true,
                message: 'Teacher added successfully!',
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
};




// update Teacher record
const update = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.students.split("-").includes('E')){

    let teacherId = req.body.teacherId;
    let updateData = {
        Staff_Code: req.body.Staff_Code,
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Email: req.body.Email,
        Specialised_Subject: req.body.Specialised_Subject,
        List_of_comfortable_Subject: req.body.List_of_comfortable_Subject,
        Age: req.body.Age,
        Contact_Number: req.body.Contact_Number,
        class_Code: req.body.class_Code,
        Address: req.body.Address,
        Qualification: req.body.Qualification,
        joining_Date: req.body.joining_Date,
        Adhar: req.body.Adhar,
        DOB: req.body.DOB,
        State: req.body.State,
        District: req.body.District,
        Experience: req.body.Experience,
    };
    teacherModel.findByIdAndUpdate(teacherId, { $set: updateData })
        .then(response => {
            res.json({
                success: true,
                message: 'Teacher added successfully!',
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
};

// deactivate  Teacher record
const remove = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.students.split("-").includes('D')){

    let teacherId = req.body.teacherId;
    let removeData = {
        Status: req.body.status
    };
    teacherModel.findByIdAndUpdate(teacherId, { $set: removeData })
        .then(response => {
            res.json({
                success: true,
                message: 'User Removed Successfully!',
                code: 200
            });``
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
};





// This is only for super admin delete an Teacher


const destroy = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.students.split("-").includes('R')){

    let teacherId = req.body.teacherId
    teacherModel.findByIdAndDelete(teacherId)
        .then(response => {
            res.json({
                success: true,
                message: 'Teacher added successfully!',
                code: 200
            });
        })
        .catch(error => {
            res.json({
                message: `${error}`
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
    index, show, store, update, destroy, remove,
}
