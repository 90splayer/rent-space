import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavbarTabs = () => {

    const pathname = usePathname()

    const tabs = [
        {
            id: 1,
            name: "Today",
            link: "/host"
        },
        {
            id: 2,
            name: "Calendar",
            link: "/host/calendar"
        },
        {
            id: 1,
            name: "Listings",
            link: "/host/listings"
        },
        {
            id: 1,
            name: "Inbox",
            link: "/host/inbox"
        },
        {
            id: 1,
            name: "Menu",
            link: "/host/menu"
        },
    ]
  return (
    <div className='flex max-w-3xl'>
        <ul className='flex flex-row items-center justify-between gap-4 text-sm font-medium text-gray-600'>
           {tabs.map((tab) => (
            <Link className='flex flex-col items-center justify-center gap-1' href={tab.link} key={tab.id}>{tab.name}
            {pathname == tab.link && <div style={{ borderBottom: '1px solid black', width: '100%' }}></div>}</Link>
           ))} 
        </ul>
    </div>
  )
}

export default NavbarTabs