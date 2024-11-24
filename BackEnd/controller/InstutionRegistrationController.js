const { response } = require('express')
const instutionModel = require('../models/InstutionModel')
const { getPermissionSet } = require('./permissionAssinment');


//Show the list of instution

const index = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.instutions.split("-").includes('RA')){

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
            searchCondition = {
                ...searchCondition,
                $or: [
                    { InstutionId: { $regex: searchText, $options: 'i' } },
                    { Instution_Name: { $regex: searchText, $options: 'i' } },
                    { Contact_Number: { $regex: searchText, $options: 'i' } },
                    { District: { $regex: searchText, $options: 'i' } },
                ]
            };
        }

        const [instution, totalCount] = await Promise.all([
            instutionModel.find(searchCondition).skip(skip).limit(limit),
            instutionModel.countDocuments(searchCondition)
        ]);

        res.json({
            success: true,
            message: "Data retrieved successfully",
            code: 200,
            totalRecords: totalCount,
            data: instution.map(instution => ({
                _id: instution._id,
                InstutionId: instution.Instution_Id,
                InstutionName: instution.Instution_Name,
                ChairManName: instution.ChairMan_Name,
                RegistrationId: instution.Registration_Id,
                ContactNumber: instution.Contact_Number,
                SecondaryContact: instution.Secondary_Contact,
                Affiliation: instution.Affiliation,
                Address: instution.Address,
                instutionType: instution.instution_Type,
                DirectorName: instution.Director_Name,
                RegistarName: instution.Registar_Name,
                ManagementMember: instution.Management_Member,
                State: instution.State,
                District: instution.District,
                Status: instution.Status,
                createdAt: instution.createdAt
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


// Get single instution Record

const show = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.instutions.split("-").includes('R')){


    let instutionId = req.query.instutionId;
    instutionModel.findById(instutionId)
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

const generateInstitutionId = async (instutionName) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeric = '0123456789';
    let instutionId = `${instutionName.split(' ').map(word => word[0]).join('')}-`;
    const charactersLength = characters.length;
    const numericLength = numeric.length;
    
    for (let i = 0; i < 3; i++) {
        instutionId += `${numeric.charAt(Math.floor(Math.random() * numericLength))}`;
    }
    
     console.log(instutionId);
     return instutionId;
};




// Add Instution to dataBase
const store = async (req, res, next) => {

    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.instutions.split("-").includes('W')){


//req.body.InstutionId=generateInstitutionId(req.body.InstutionName);
    let instution = new instutionModel({
        Instution_Id: generateInstitutionId(req.body.InstutionName),
        Instution_Name: req.body.InstutionName,
        ChairMan_Name: req.body.ChairManName,
        Registration_Id: req.body.RegistrationId,
        Contact_Number: req.body.ContactNumber,
        Secondary_Contact: req.body.SecondaryContact,
        Affiliation: req.body.Affiliation,
        Address: req.body.Address,
        instution_Type: req.body.instutionType,
        Director_Name: req.body.DirectorName,
        Registar_Name: req.body.RegistarName,
        Management_Member: req.body.ManagementMember,
        State: req.body.State,
        District: req.body.District,
        Status: true,
    })
    instution.save()
        .then(response => {
            res.json({
                success: true,
                message: 'Instution registered successfully!',
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

// update Instution record
const update = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.instutions.split("-").includes('E')){

    let instutionId = req.body.InstutionId
    let updateData = {
        Instution_Id: req.body.InstutionId,
        Instution_Name: req.body.InstutionName,
        ChairMan_Name: req.body.ChairManName,
        Registration_Id: req.body.RegistrationId,
        Contact_Number: req.body.ContactNumber,
        Secondary_Contact: req.body.SecondaryContact,
        Affiliation: req.body.Affiliation,
        Address: req.body.Address,
        instution_Type: req.body.instutionType,
        Director_Name: req.body.DirectorName,
        Registar_Name: req.body.RegistarName,
        Management_Member: req.body.ManagementMember,
        State: req.body.State,
        District: req.body.District,
        Status: true,
    }
    instutionModel.findByIdAndUpdate(instutionId, { $set: updateData })
        .then(response => {
            res.json({
                success: true,
                message: 'Instution details updated sucessfully',
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

// deactivate instution record
const remove = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.instutions.split("-").includes('D')){

    let instutionId = req.body.InstutionId
   
    let updateData = {
        // RollNo : req.body.RollNo, // TODO this fild note requered
        Status: req.body.status,
        
    }
    instutionModel.findByIdAndUpdate(instutionId, { $set: updateData })
        .then(response => {
            res.json({
                success: true,
                message: 'Instution DeActivated Successfully!',
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

// delete an instution

const destroy = async (req, res, next) => {
    const permissionsResult = await getPermissionSet(req);
    if(permissionsResult.instutions.split("-").includes('D')){

    let instutionId = req.body.InstutionId
    instutionModel.findByIdAndDelete(instutionId)
        .then(response => {
            res.json({
                message: 'Instution Removed sucessfully'
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