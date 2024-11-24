const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const teacherSchema = new Schema({
   Staff_Code: {
       type: String,
       required: false
   },
   First_Name: {
       type: String,
       required: true
   },
   Last_Name: {
       type: String,
       required: true
   },
   Email: {
       type: String,
       required: false,
       unique: true
   },
   Specialised_Subject: {
       type: String,
       required: true
   },
   List_of_comfortable_Subject: {
       type: [String],
       required: true
   },
   Contact_Number: {
       type: String,
       required: true
   },
   Address: {
       type: String,
       required: true
   },
   Qualification: {
       type: String,
       required: true
   },
   joining_Date: {
       type: Date,
       required: true
   },
   DOB: {
       type: Date,
       required: true
   },
   Adhar: {
       type: String,
       required: false
   },
   Age: {
       type: Number,
       required: false
   },
   State: {
       type: String,
       required: true
   },
   District: {
       type: String,
       required: true
   },
   Experience: {
       type: String,
       required: true
   },
   Status: {
    type: Boolean,
    required: true
}
  
  
}, { timestamps: true });

teacherSchema.index({ Staff_Code: 1, Contact_Number: 1, Email: 1}, { unique: true });

const Teacher = mongoose.model('Teacher', teacherSchema);


module.exports = Teacher;