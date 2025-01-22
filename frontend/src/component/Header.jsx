import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div className='bg-gray-200 flex items-center justify-center font-medium h-[40px]'>
            {/* <img src={assets.logo} alt='logo' className='w-36' /> */}
            <ul className='hidden sm:flex gap-5 space-x-9 font-poppins text-sm text-gray-700'>
                <NavLink to='/home' className='flex flex-col items-center gap-1' >
                    <p>Home</p>
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1' >
                    <p>About</p>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1' >
                    <p>Contact</p>
                </NavLink>
            </ul>
        </div>
    )
}

export default Header