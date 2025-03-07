import { sidebarSelector } from '@/store/features/auth/selectors'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const SidebarHeader = () => {

    const isSidebarOpen = useSelector(sidebarSelector)
    return (
        <div className="flex justify-center md:justify-start py-[14px]"
            style={{
                marginTop: isSidebarOpen ? "10px" : "",
                marginBottom: isSidebarOpen ? "20px" : "30px"
            }}
        >
            {/* <Link href={"/admin/manage-tests"}> */}
            <Image
                style={{
                    marginTop: isSidebarOpen ? "15px" : ""
                }}
                src='../logo.svg' className="block py-2 duration-300 transition-all" height={isSidebarOpen ? 70 : 48} width={isSidebarOpen ? 55 : 32} alt="Brand Logo"
            />
            {/* </Link> */}
        </div>
    )
}

export default SidebarHeader