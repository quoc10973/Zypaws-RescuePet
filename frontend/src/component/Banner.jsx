import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

const Banner = () => {

    const bannerList = [
        assets.banner1,
        assets.banner2,
        assets.banner3,
        assets.banner4,
    ]

    const [randomBanner, setRandomBanner] = useState('');

    useEffect(() => {
        // Randomly select a banner from the list
        const randomIndex = Math.floor(Math.random() * bannerList.length);
        setRandomBanner(bannerList[randomIndex]);
    }, []); // Run only once on component mount

    return (
        <div className="w-full h-[50vh] sm:h-[40vh] md:h-[60vh] lg:h-[80vh] relative">
            {/* Banner Image */}
            <img
                src={randomBanner}
                alt="banner"
                className="w-full h-full object-cover"
            />

            {/* Overlay to darken the banner */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Text Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold font-dancing space-y-5">
                {/* Line 1 - Fade In with Shadow */}
                <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl opacity-0 animate-fade-in drop-shadow-2xl">
                    Rescue One,
                </div>
                {/* Line 2 - Fade In with Delay and Shadow */}
                <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl opacity-0 animate-fade-in-delayed drop-shadow-2xl">
                    Change Their World !
                </div>
            </div>
        </div>
    );
};

export default Banner;
