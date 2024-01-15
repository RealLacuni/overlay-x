import React from 'react'

type SidebarProps = {
    children?: React.ReactNode
    }
const Sidebar = ({children} : SidebarProps) => {
  return (
    <div className='h-screen w-2/5 bg-indigo-800'>{children}</div>
  )
}

export default Sidebar;