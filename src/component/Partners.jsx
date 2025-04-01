import React from 'react'
import { assets } from '../assets/assets'

const Partners = () => {
    return (
        <div className='flex flex-col items-center justify-center p-5 py- mb-10'>
            <div className='space-y-3'>
                <h1 className="text-3xl text-slate-800 font-bold text-center font-lora">Our Partners</h1>
                <p className="text-center font-lora text-gray-800">We are proud to work with these companies</p>
            </div>
            <div className='flex justify-center items-center gap-5 mt-8 space-x-5'>
                <img src={assets.partner1} alt="Partner 1" className="w-20 h-20 object-contain" />
                <img src={assets.partner2} alt="Partner 2" className="w-20 h-20 object-contain" />
                <img src={assets.partner3} alt="Partner 3" className="w-20 h-20 object-contain" />
            </div>
        </div>
    )
}

export default Partners
