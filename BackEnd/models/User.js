
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  userSchema= new Schema({
  FirstName: {
    type: String,
    required: true
  } ,
  LastName: {
    type: String,
    required: true
  } ,
  Email: {
    type: String,
  },
  Phone:{
    type: String,
    required: true
  },
  Password:{
    type: String,
    require: true
  },
  UserName:{
    type: String,
    require: true
  },
  InstutionCode:{             // here we can store instution code
    type: String,
    require: true
  },
  UserType: {          // we can define type of user
    type: String,
    required: true
  },
  PermissionSet: {     // here we can assing permission level, we can assing multiple permission set using comma seperated
    type: String,
  },
  MemberId: {         // this field is used for storing employee Id or Student Id
    type: String,
  },

},{timestamps: true});

userSchema.index({ Email: 1, Phone: 1, UserName: 1,  MemberId: 1}, { unique: true });

const User  = mongoose.model('User', userSchema );
module.exports =  User; 