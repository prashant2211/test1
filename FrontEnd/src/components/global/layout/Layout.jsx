import React, { useState } from 'react';
import './Layout.scss';
import Sidebar from '../sidebar/Sidebar';
import { motion } from "framer-motion";
import Header from "../header/Header.jsx"
import { Drawer } from "@material-tailwind/react";
import CustomBreadcrumb from '../customBreadcrumb/CustomBreadcrumb.jsx';

export default function AppLayout({ children, title = "EduOrbit CRM", parent }) {


    const [collapsed, setCollapsed] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div>
            <div className='flex w-full'>
                <motion.div className='hidden lg:block' animate={{ marginLeft: collapsed ? "0px" : "-250px", transition: { duration: 0.5 } }}>
                    <Sidebar />
                </motion.div>
                {/* <div className={`bg-white lg:ml-[250px] lg:w-[${collapsed ? "calc(100%-250px)" : "100%"}]`} > */}
                    <div className={`bg-white lg:ml-[250px] ${collapsed ? 'lg:w-[calc(100%-250px)]' : 'lg:w-full'} w-full`} >
                    <Header collapsed={collapsed} title={title} setCollapsed={setCollapsed} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

                    <div className='p-2 md:p-4'>
                        <CustomBreadcrumb title={title} parent={parent} />
                    </div>

                    <div className='px-2 md:px-4 pb-2 md:pb-4'>
                        <div >
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(!isDrawerOpen)} className={`top-0 left-0 h-[100vh] lg:hidden w-full ${isDrawerOpen ? 'sidebar-drawer' : 'w-auto'}`}>
                <Sidebar />
                <div className='fixed left-[260px] top-[10px]'>
                    <svg onClick={() => setIsDrawerOpen(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer lg:hidden">
                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </div>
            </Drawer>
        </div>
    )
}
