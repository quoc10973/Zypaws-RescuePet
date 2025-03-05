import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import MobileTopBar from "../component/MobileTopBar";

const DonatePage = () => {
    const [amount, setAmount] = useState(100);
    const donationAmounts = [
        { value: 43, text: "Can give a homeless pet the best chance on Zypaws." },
        { value: 69, text: "Funds projects and activities to help the ones that need more love." },
        { value: 100, text: "Administer pet medication and ensure optimal health care" },
        { value: 150, text: "Helps find a home for every pet that needs one." }
    ];
    const [message, setMessage] = useState("");

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

                {/* Donation Form */}
                <h2 className="text-lg font-lora font-bold text-green-700 py-4 mt-10 text-center">
                    Get started by selecting an amount below
                </h2>
                <div className="p-6 bg-gray-100 rounded-lg max-w-md mx-auto">

                    <p className="text-center text-gray-500 text-sm mb-4">
                        Create Happiness - Save Lives 🐾🐾
                    </p>

                    {donationAmounts.map((donation) => (
                        <button
                            key={donation.value}
                            className={`block w-full text-2xl text-left px-4 py-3 rounded-lg font-bold mb-2 ${amount === donation.value ? 'bg-green-600 text-white' : 'bg-white'}`}
                            onClick={() => setAmount(donation.value)}
                        >
                            ${donation.value} <span className="text-lg font-light"> -  {donation.text} </span>
                        </button>
                    ))}

                    <div className="mt-4 px-10">
                        <label className="block text-gray-700 font-bold">Or choose your own amount $</label>
                        <input
                            type="number"
                            className="w-full text-xl p-3 px-3 border rounded-lg mt-2"
                            value={amount}
                            onChange={(e) => {
                                const newValue = e.target.value.replace(/\D/g, ""); // Allow only numbers
                                setAmount(newValue ? Number(newValue) : ""); // "" if empty or letters
                            }}
                        />
                    </div>
                </div>

                {/* Message Input */}
                <p className="text-gray-700  font-lora italic text-center mt-12 font-medium mb-4">
                    We allow donations via PayPal. Please click the button below to donate.
                </p>
                <div className="mt-6 px-0 md:px-20 lg:px-52">
                    <label className="block text-gray-700 font-bold">
                        Leave a message (optional)
                    </label>
                    <textarea
                        className="w-full text-lg p-3 border rounded-lg mt-2 resize-none"
                        rows="4"
                        placeholder="Write your message here..."
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                </div>

                {/* Donate Button */}
                <div className="mt-6 text-center px-6">

                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg w-full md:w-auto"
                        onClick={() => window.location.href = "https://www.paypal.com/donate"}
                    >
                        Donate via PayPal
                    </button>
                </div>

            </div>
        </>
    );
};

export default DonatePage;
