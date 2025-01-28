import React from 'react';
import { assets } from '../assets/assets';

const Search = () => {
    return (
        <div className="flex flex-col py-10 px-6 sm:px-10 md:flex-row justify-between items-center space-y-8 md:space-y-0">
            {/* Form */}
            <form className="flex flex-col items-start justify-between space-y-3 md:space-y-3 md:space-x-3">
                <p className="font-lora font-bold sm:ml-0 md:ml-2 text-slate-700 text-4xl">
                    Start your rescue pet here.
                </p>
                <p className="font-quicksand font-bold">I'm looking for...</p>
                <select
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-[300px] focus:outline-none focus:ring-2 focus:ring-slate-500"
                    defaultValue="" // default value is empty
                >
                    <option value="" disabled>
                        Any type of pet
                    </option>
                    <option value="dogs">Dogs</option>
                    <option value="cats">Cats</option>
                    <option value="parrots">Parrots</option>
                    <option value="rodents">Rodents</option>
                    <option value="rabbits">Rabbits</option>
                    <option value="sheeps">Sheeps</option>
                </select>
                <p className="font-quicksand">Many types of pets are available for adoption at Zypaws Home.</p>
                <p className="font-quicksand">We hope you find a new friend today!</p>
                <button
                    type="submit"
                    className="font-signika mx-auto text-center text-white bg-slate-800 py-1 px-12 rounded-lg text-lg transition-all duration-300 hover:bg-slate-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Start your search !
                </button>
            </form>

            {/* Decorate Image */}
            <img
                src={assets.decorate6}
                alt="Decorate 6"
                className="w-40 h-40 md:w-52 md:h-52 mx-auto object-contain"
            />

            {/* Right Section */}
            <div className="text-center ">
                <img
                    src={assets.bestie}
                    alt="Besties"
                    className="w-70 h-48 md:w-70 md:h-48 -mt-[50px] md:mt-0 mx-auto object-contain"
                />
                <p className="font-dancing text-3xl md:text-5xl mt-[-10px] text-gray-800">Your bestie</p>
                <p className="font-dancing text-xl md:text-2xl text-gray-600">
                    is waiting for you ... ♡
                </p>
            </div>
        </div>
    );
};

export default Search;
