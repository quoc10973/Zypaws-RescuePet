import React from "react";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";

const Information = () => {
    return (
        <div className="bg-black text-black p-2 text-sm font-semibold hidden sm:block">
            <ul className="flex items-center justify-center gap-3 space-x-8 md:gap-6 text-white">
                <li className="flex items-center gap-2 font-signika">
                    <HiLocationMarker size={22} />
                    <span className="text-xs md:text-sm">Ho Chi Minh - Viet Nam</span>
                </li>
                <li className="flex items-center gap-2 font-signika">
                    <HiMail size={22} />
                    <a href="mailto:info@zypaws.com" className="hover:underline text-xs md:text-sm">
                        info@zypaws.com
                    </a>
                </li>
                <li className="flex items-center gap-2 font-signika">
                    <HiPhone size={22} />
                    <a href="tel:0838699817" className="hover:underline text-xs md:text-sm">
                        (+84) 838699817
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Information;
