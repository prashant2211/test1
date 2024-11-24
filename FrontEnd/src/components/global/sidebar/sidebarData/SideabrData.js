import Banner from "../../../../assets/Banner";
import Teacher from "../../../../assets/Teacher";
import Instudion from "../../../../assets/Instudion";
import Dashboard from "../../../../assets/Dashboard";
import Student from "../../../../assets/Student";
import Tutorial from "../../../../assets/Tutorial";
import Disc from "../../../../assets/common/Disc";
import Support from "../../../../assets/support/Support";
import SystemSetting from "../../../../assets/systemSetting/SystemSetting";


export const SidebarData = [
    {
        title: 'Dashboard',
        icon: <Dashboard />,
        url: '/dashboard',
        activeUrl: ['/dashboard']
    },
    {
        title: 'Instution',
        icon: <Instudion />,
        url: '/instution',
        activeUrl: ['/instution','/instution_details']
    },
    {
        title: 'Teacher',
        icon: <Teacher />,
        url: '/teacher',
        activeUrl: ['/teacher', '/teacher_details','/logs',]
    },
    {
        title: 'Student',
        icon: <Student />,
        url: '/student',
        activeUrl: ['/student']
    },
  
    {
        title: 'Banner',
        icon: <Banner />,
        url: '/banner',
        activeUrl: ['/banner']
    },
    {
        title: 'Support',
        icon: <Support />,
        children: [
            {
                title: 'Ticket',
                activeUrl: ['/ticket', '/view_ticket'],
                icon: <Disc />,
                url: '/ticket',
            },
            {
                title: 'FAQ',
                activeUrl: ['/faq'],
                icon: <Disc />,
                url: '/faq',
            },
        ],
    },
    {
        title: 'Tutorial',
        icon: <Tutorial />,
        url: '/'
    },
 
  
    {
        title: 'Settings',
        icon: <SystemSetting />,
        activeUrl: ['/notifications'],
        children: [
            {
                title: 'Notifications',
                icon: <Disc />,
                url: '/notifications',
                activeUrl: ['/notifications'],
            },
         
          
        ],
    }
]