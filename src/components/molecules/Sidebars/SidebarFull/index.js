import React from 'react'

import SidebarHeader from '../SidebarHeader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sideBarData } from '../data'

const SidebarFull = ({ isSidebarOpen, toggleSidebar }) => {


    const pathname = usePathname();

    const isActive = (routeName) => {
        return routeName.includes(pathname);
    };



    return (
        <>
            <div className="flex justify-center">
                <SidebarHeader />
            </div>

            <ul className="mr-[-10px] flex h-[90%] flex-col gap-1 overflow-y-auto pr-[10px] transition-all duration-300 ease-in-out">
                {sideBarData?.map((val, i) => (
                    <li key={val?.label} className='px-3'>
                        <Link
                            href={val.route}
                            className={`nav-link flex items-center  justify-start gap-3 rounded-lg px-3 py-3 transition duration-[0.4s] hover:bg-[#3B82F6] ${isActive(val.routeName) ? "bg-primary-500" : ""}`}
                        >
                            {val.Icon}
                            <span
                                className={`text-14 font-medium leading-24 ml-1 text-white`}
                            >
                                {val?.fullLabel || val.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default React.memo(SidebarFull)