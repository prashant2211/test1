import Dashboard from '../pages/dashboard/Dashboard.jsx';
import Client from '../pages/teacher/Teacher.jsx';
import ClientDetails from '../pages/teacher/components/TeacherDetails.jsx';
import Student from '../pages/student/Student.jsx';
import Task from '../pages/task/Task.jsx';
import Banner from '../pages/banner/Banner.jsx';
import AdminLogin from '../pages/auth/Admin_login.jsx';
import ResetPassword from '../pages/authpage/ResetPassword.jsx';
import ForgetPassword from '../pages/authpage/ForgetPassword.jsx';
import Login from '../pages/authpage/Login.jsx';
import ForgetPasswordotp from '../pages/authpage/forget_otp.jsx';
import Ticket from '../pages/support/ticket/Ticket.jsx';
import ViewTicket from '../pages/support/ticket/ViewTicket.jsx';
import Faq from "../pages/support/faq/Faq.jsx";
import FAQs from '../pages/support/faq/Faq.jsx';
import ChangePassword from '../pages/teacher/components/ChangePassword.jsx'
import Logs from '../pages/teacher/components/Logs.jsx'
import SendCredentials from '../pages/teacher/components/SendCredentials.jsx'
import SendNotification from '../pages/teacher/components/SendNotification.jsx'
import Inbox from '../pages/inbox/Inbox.jsx';
import Instudion from "../pages/school/school.jsx"
import InstutionDetails from "../pages/school/components/InstudionDetails.jsx"


export const initialRoutes = () => {
    const routes = [
        // ============ Auth ===============
        { path: "/admin_login", type: "auth", component: AdminLogin },
        { path: "/", type: "auth", component: Login },
        { path: "/forget_password", type: "auth", component: ForgetPassword },
        { path: "/reset_password", type: "auth", component: ResetPassword },
        { path: "/forgotpassword_otp", type: "auth", component: ForgetPasswordotp },
        // ============ Public =============
        // all public routes should be here
        // ============ Privet ==============
        { path: "/dashboard", type: "private", component: Dashboard, title: "Dashboard" },
        { path: "/teacher", type: "private", component: Client, title: "Teacher" },
        {
            path: "/teacher/:id", type: "private", component: ClientDetails, title: "Teacher Details",
            parent: [{ title: 'Teacher', path: '/teacher' }]
        },
        { path: "/student", type: "private", component: Student, title: "Student" },
        { path: "/instution", type: "private", component: Instudion, title: "Instution" },
        { path: "/instution_details/:id", type: "private", component: InstutionDetails, title: "Instution Details" },

        
        { path: "/task", type: "private", component: Task, title: "Task" },
        { path: "/banner", type: "private", component: Banner, title: "Banner" },
        { path: "/ticket", type: "private", component: Ticket, title: "Ticket" },
        { path: "/view_ticket/:id", type: "private", component: ViewTicket, title: "View Ticket", parent: [{ title: 'Ticket', path: '/ticket' }] },
        { path: "/faq", type: "private", component: Faq, title: "Faq" },
        { path: "/inbox", type: "private", component: Inbox, title: "Inbox" },
        { path: "/faq", type: "private", component: FAQs, title: "FAQs" },
        { path: "/change_password", type: "private", component: ChangePassword, title: "Change Password" },
        {
            path: "/logs/:id", type: "private", component: Logs, title: "Logs",
            
            parent: [{ title: 'Teacher', path: '/teacher' }, { title: "Teacher Details", path: "/teacher_details/:id" }]
        },
      
        { path: "/send_credentials", type: "private", component: SendCredentials, title: "Send Credentials" },
        { path: "/send_notification", type: "private", component: SendNotification, title: "Send Notification" },
    ]
    return routes;
}

// export default initialRoutes