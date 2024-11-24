

const express    = require('express');
const mongooes   = require('mongoose');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const cors       = require('cors');
require('dotenv').config();

const studentRoutes                 = require('./routes/studentRoute')
const classRoutes                   = require('./routes/classRoute')
const teacherRoutes                 = require('./routes/teacherRoute')
const studentFeeDetailsRoute        = require('./routes/studentFeeDetailsRoute')
const admissionRoute                = require('./routes/admissionRoute')
const staffJobformRoute             = require('./routes/staffJobApplyRoutes')
const managementMemberRoute         = require('./routes/managementRoute')
const AuthRoute                     = require('./routes/Auth')
const instution                     = require('./routes/InstutionRoute');
const teacherDocRoute               = require('./routes/teacherDocRoute');
const staffSalaryDetailsRoutes      = require('./routes/staffSalaryDetailsRoutes');
const staffSalaryPayment            = require('./routes/staffSalaryPaymentDetailsRoute');
const permissionCheck               = require('./routes/permissionAssinmentRoute');


mongooes.connect(process.env.DBCONNECTIONURL)

const db = mongooes.connection
db.on('error',(err)=>{
    console.log(err)
})

db.once('open', ()=>{
    console.log('Connection Successfully Established...');
})

const app = express();
app.use(cors());

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true})) 
app.use(bodyParser.json())

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log('-=- Server is running on PORT : ',PORT);
})



app.use('/EduOrbit/student',studentRoutes)
app.use('/EduOrbit/class',classRoutes)
app.use('/EduOrbit/teacher',teacherRoutes)
app.use('/EduOrbit/feeStructure',studentFeeDetailsRoute)  
app.use('/EduOrbit/admission',admissionRoute)            
app.use('/EduOrbit/staffJobForm',staffJobformRoute)
app.use('/EduOrbit/managementMember',managementMemberRoute)  //
app.use('/EduOrbit',AuthRoute)
app.use('/EduOrbit/instution',instution)
app.use('/EduOrbit/manage_Teacher_Doc',teacherDocRoute)
app.use('/EduOrbit/salary',staffSalaryDetailsRoutes)
app.use('/EduOrbit/salary_payment',staffSalaryPayment)
app.use('/EduOrbit/permission',permissionCheck)


