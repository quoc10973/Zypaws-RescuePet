import { useEffect } from "react";
import { assets } from "../assets/assets";
import MobileTopBar from "../component/MobileTopBar";

const DonatePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <MobileTopBar />
            <div className="px-12 md:px-8 lg:px-8 py-10">

                <div className="flex flex-col  font-lora text-gray-700 md:flex-row items-center justify-center gap-10 md:gap-20">
                    {/* Banner Image */}
                    <div className="flex items-center justify-center p-4 bg-gray-300 rounded-full w-[300px] h-[250px] md:w-[390px] md:h-[350px] shadow-lg">
                        <img
                            className="w-50 h-50 md:w-96 md:h-72 object-cover rounded-lg animate-tilt"
                            src={assets.catdonatebanner}
                            alt="donate-banner"
                        />
                    </div>

                    {/* Donation Info */}
                    <div className="text-justify space-y-6 md:text-left">
                        <h1 className="text-2xl indent-3 md:text-3xl font-bold text-gray-800">
                            Donate to Save a Life 🐾
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-2 max-w-md">
                            Right now, many abandoned pets are searching for a second chance.
                            The lucky ones have found refuge at <span className="font-semibold">Zypaws Rescue Home</span> and are ready to find a loving family.
                        </p>

                        <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-2 max-w-md">
                            Your donation helps provide <span className="font-semibold">medical care, food, shelter, and rescue programs</span>
                            that ensure these pets are safe and cared for.
                        </p>

                        <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-2 max-w-md">
                            <span className="font-semibold">No one should have to give up their pet due to hardship.</span>
                            With your support, we can help pets stay with their families and prevent them from ending up in unsafe situations.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DonatePage;
