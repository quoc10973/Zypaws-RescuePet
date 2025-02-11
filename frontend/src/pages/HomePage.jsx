import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import Banner from '../component/Banner';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import WaveBackground from '../component/WaveBackground';
import Search from '../component/Search';
import DonatetionBanner from '../component/DonatetionBanner';
import Partners from '../component/Partners';
import { AuthContext } from '../context/AuthContext';
import PetAvailable from '../component/PetAvailable';

const HomePage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);
    const { auth } = useContext(AuthContext);

    // Kiểm tra xem phần tử có vào trong vùng nhìn thấy không khi cuộn chuột
    const handleScroll = () => {
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const isInViewport = rect.top <= window.innerHeight + 500 && rect.bottom >= 0;
            setIsVisible(isInViewport);
        }
    };

    useEffect(() => {
        // Listen scroll event
        window.addEventListener('scroll', handleScroll);

        // call handleScroll() when component mount
        handleScroll();

        // clear event listener when component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Chỉ chạy lần đầu tiên khi component mount

    return (
        <div>
            <Banner />
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw]">
                <div className="flex justify-center items-center py-10">
                    <img src={assets.decorate3} alt="Decorate 3" className="w-12 h-44 mb-[-50px]" />
                </div>
                <br />
                <div className="text-center items-start space-y-4 p-12">
                    <p className="font-playwrite font-bold text-green-700 text-1xl sm:text-3xl md:text-3xl lg:text-4xl">
                        Rescue Stray Pet,
                    </p>
                    <p className="font-quicksand font-semibold text-gray-600 text-lg sm:text-xl md:text-2xl">
                        Bringing hope and love to every stray pet.
                        <br />
                        Helping them find a home
                        <i> (one that needs it) </i> since 2024.
                    </p>
                    <br />
                    <p
                        ref={elementRef}
                        className={`text-justify font-lora text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <b>For almost two decades</b>, PetRescue has been at the forefront of the animal rescue movement, tirelessly working to raise awareness about pet adoption and saving lives.
                        We've provided rescue, rehabilitation, and rehoming services to thousands of abandoned and stray animals, giving them a second chance at a better life.
                        <br />
                        <br />
                        <b>Our work</b> has made a significant difference in the Australian rescue community, inspiring thousands of people to adopt and care for animals in need.
                        But, until every pet is safe, respected, and loved, we all still have big, hairy work to do. <Link to='/about-the-safe-sound-pets-program' className="hover:underline text-green-600"><b>Find out</b></Link>  more about our mission to help save 100,000 healthy and rehomable pets each year.
                    </p>
                    <br />
                    <div className="relative group">
                        <Link
                            to="about-the-safe-sound-pets-program"
                            className="relative inline-block font-lora italic text-white font-semibold py-2 px-9 rounded-lg bg-slate-800 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-gray-900/50"
                        >
                            <span className="absolute inset-0 w-full h-full  rounded-lg opacity-0 group-hover:opacity-100 group-hover:blur-md transition-opacity duration-300"></span>
                            <span className="relative z-10">Find Out More</span>
                        </Link>
                    </div>
                    <br />
                    <p ref={elementRef} className="font-lora font-bold text-gray-600 text-lg sm:text-xl md:text-4xl">
                        Many years of impact
                    </p>
                    <p ref={elementRef} className={`font-quicksand font-semibold text-gray-600 text-xs sm:text-xs md:text-sm transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        We've been saving lives and creating families for over 3 years.
                    </p>
                </div>
                <div className='flex justify-center mb-2' >
                    <img src={assets.decorate4} alt="Decorate 4" className="w-28 h-50" />
                </div>
            </div>
            <WaveBackground />
            <div className="flex justify-center items-center py-10">
                <img src={assets.decorate7} alt="Decorate 3" className="w-52 h-48 mb-[-90px]" />
            </div>
            <div className="px-9 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] text-center">
                <div className='mt-14 space-y-10'>
                    <h1 className="text-2xl px-5 sm:text-3xl font-playwrite font-bold md:text-3xl lg:text-4xl text-green-700">Find Your Rescue Pet with Ease!!!</h1>
                    <div className='flex flex-col sm:flex-row space-y-6 shadow-md rounded-md sm:space-x-12 py-2'>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 0 : 1 }}
                            transition={{ duration: 1.5 }}
                            className="text-lg sm:text-lg md:text-xl italic text-justify leading-relaxed px-7 font-lora text-gray-700 -mt-5 md:mt-10 mx-auto"
                        >
                            With just a few simple steps, you can discover adorable pets waiting for a loving home.
                            Select the type of pet you're looking for, explore their unique stories, and take the first step toward giving them a second chance at happiness.
                            Every pet deserves a warm and caring home — Start your journey to finding your new best friend today! ❤️🐶🐱🐰
                        </motion.p>
                        <img src={assets.catbanner} alt="Cat Banner" className="w-full p-3 sm:p-0 sm:w-7/12 h-52 sm:h-64 object-cover mt-4" />
                    </div>
                </div>
                <Search />
            </div>
            <PetAvailable />
            <Partners />
            <DonatetionBanner />

        </div>
    );
};

export default HomePage;
