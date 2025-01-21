import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='bg-slate-900  flex items-center justify-between py-4 font-medium'>
            <img src={assets.logo} alt='logo' className='w-36' />
        </div>
    )
}

export default Header