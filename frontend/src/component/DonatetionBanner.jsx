import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const DonatetionBanner = () => {
    return (
        <div className="relative p-1">
            <img
                src={assets.banner5}
                alt="Banner 5"
                className="w-full sm:h-[10vh] md:h-[10vh] lg:h-[35vh] object-cover"
            />
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-around bg-black/40 text-white gap-y-14 space-y-3 md:space-y-0">
                <p className="text-3xl md:text-5xl font-bold font-lora text-center">Ready to sponsor us?</p>
                <NavLink
                    to="/donate"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 
               text-white font-lora font-bold py-3 px-10 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 animate-bounce"
                >
                    Help us now
                </NavLink>
            </div>
        </div>
    )
}

export default DonatetionBanner
