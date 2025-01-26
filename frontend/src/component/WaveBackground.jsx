import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import CountUp from 'react-countup'; // Thêm import CountUp

const WaveBackground = () => {
    return (
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] bg-gradient-to-b from-slate-100 to-slate-300 z-10">
            <svg
                className="absolute bottom-0 left-0 right-0 w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="#ffffff"
                    fillOpacity="1"
                    d="M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,224C672,245,768,267,864,256C960,245,1056,203,1152,186.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>

            <div className="absolute md:mt-[-100px] top-0 left-0 right-0 flex justify-center items-center space-x-5 h-full z-20">
                {/* Cột hiển thị duy nhất khi màn hình nhỏ */}
                <div className="p-6 rounded-lg w-full sm:w-1/3 bg-transparent text-center relative sm:hidden block">
                    <img src={assets.decorate5} alt="Decorate 5" className="absolute top-0 ml-2 left-1/2 transform -translate-x-1/2 w-36 h-24" />
                    <h3 className="text-5xl font-playwrite font-semibold text-green-700 mt-20">
                        <CountUp start={0} end={500} duration={8.5} />
                    </h3>
                    <p className="text-black mt-4 font-quicksand">available pets for adopting</p>
                    <NavLink to="/adopt" className="font-lora italic text-white bg-slate-800 py-1 px-7 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-slate-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4 inline-block">
                        Adopt Now
                    </NavLink>
                </div>

                {/* Các cột hiển thị khi màn hình lớn hơn sm */}
                <div className="p-6 rounded-lg w-1/3 bg-transparent text-center relative hidden sm:block">
                    <img src={assets.decorate5} alt="Decorate 5" className="absolute top-0 ml-2 left-1/2 transform -translate-x-1/2 w-36 h-24" />
                    <h3 className="text-5xl font-playwrite font-semibold text-green-700 mt-20">
                        <CountUp start={0} end={100000} duration={6.5} />
                    </h3>
                    <p className="text-black mt-4 font-quicksand">total pets adopted</p>
                    <NavLink to="/adopted" className="font-lora italic text-white bg-slate-800 py-1 px-7 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-slate-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4 inline-block">
                        See More
                    </NavLink>
                </div>
                <div className="p-6 rounded-lg w-1/3 bg-transparent text-center relative hidden sm:block">
                    <img src={assets.decorate5} alt="Decorate 5" className="absolute top-0 ml-2 left-1/2 transform -translate-x-1/2 w-36 h-24" />
                    <h3 className="text-5xl font-playwrite font-semibold text-green-700 mt-20">
                        <CountUp start={0} end={1500000} duration={6.5} separator="," />
                    </h3>
                    <p className="text-black mt-4 font-quicksand">in food & product donation</p>
                    <NavLink to="/donation" className="font-lora italic text-white bg-slate-800 py-1 px-7 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-slate-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4 inline-block">
                        Donate Us
                    </NavLink>
                </div>
                <div className="p-6 rounded-lg w-1/3 bg-transparent text-center relative hidden sm:block">
                    <img src={assets.decorate5} alt="Decorate 5" className="absolute top-0 ml-2 left-1/2 transform -translate-x-1/2 w-36 h-24" />
                    <h3 className="text-5xl font-playwrite font-semibold text-green-700 mt-20">
                        <CountUp start={0} end={500} duration={6.5} />
                    </h3>
                    <p className="text-black mt-4 font-quicksand">available pets for adopting</p>
                    <NavLink to="/adopt" className="font-lora italic text-white bg-slate-800 py-1 px-7 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-slate-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4 inline-block">
                        Adopt Now
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default WaveBackground;
