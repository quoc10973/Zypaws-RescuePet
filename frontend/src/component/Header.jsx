import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const Header = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation(); // Track the current location

    useEffect(() => {
        setActiveDropdown(null);
    }, [location.pathname]); // Close dropdown when location changes

    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    return (
        <div className='bg-gray-200 border border-gray-200 items-center justify-center font-medium h-[40px] hidden sm:flex'>
            <ul className='flex gap-7 space-x-2 font-signika text-md text-gray-700 h-full'>
                <li className='h-full relative z-10'>
                    <div
                        onClick={() => toggleDropdown('dog')}
                        className='flex items-center text-red-900 font-semibold justify-center h-full hover:bg-slate-100 px-4 cursor-pointer'
                    >
                        Dogs {activeDropdown === 'dog' ? <ChevronUpIcon className='h-3 w-4 ml-2' /> : <ChevronDownIcon className='h-3 w-4 ml-2' />}
                    </div>
                    <ul
                        className={`absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-56 transition-all duration-300 transform ${activeDropdown === 'dog' ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                            } origin-top`}
                    >
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/dog/listing'>View All Dogs</NavLink>
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/dog/feeding'>Feeding Your Dog</NavLink>
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/dog/behavior'>Dog Behavior</NavLink>
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/dog/training'>Dog Training</NavLink>
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/dog/information'>Other Dog Infomation</NavLink>
                        </li>
                    </ul>
                </li>
                <li className='h-full relative z-10'>
                    <div
                        onClick={() => toggleDropdown('cat')}
                        className='flex items-center text-red-900 font-semibold justify-center h-full hover:bg-slate-100 px-4 cursor-pointer'
                    >
                        Cats {activeDropdown === 'cat' ? <ChevronUpIcon className='h-3 w-4 ml-2' /> : <ChevronDownIcon className='h-3 w-4 ml-2' />}
                    </div>
                    <ul
                        className={`absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-56 transition-all duration-300 transform ${activeDropdown === 'cat' ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                            } origin-top`}
                    >
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/cat/listing'>View All Cats</NavLink>
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/cat/feeding'>Feeding Your Cat</NavLink>
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/cat/behavior'>Cat Behavior</NavLink>
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/cat/training'>Cat Training</NavLink>
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/cat/information'>Other Cat Infomation</NavLink>
                        </li>
                    </ul>
                </li>
                <li className='h-full relative z-10'>
                    <div
                        onClick={() => toggleDropdown('other-pets')}
                        className='flex items-center text-red-900 font-semibold justify-center h-full hover:bg-slate-100 px-4 cursor-pointer'
                    >
                        Other Pets {activeDropdown === 'other-pets' ? <ChevronUpIcon className='h-3 w-4 ml-2' /> : <ChevronDownIcon className='h-3 w-4 ml-2' />}
                    </div>
                    <ul
                        className={`absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-56 transition-all duration-300 transform ${activeDropdown === 'other-pets' ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                            } origin-top`}
                    >
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/parrot'>Parrots</NavLink>
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/rodent'>Rodents</NavLink>
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/rabbit'>Rabbits</NavLink>
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-100'>
                            <NavLink to='/sheep'>Sheeps</NavLink>
                        </li>
                    </ul>
                </li>
                <li className='h-full'>
                    <NavLink to='/about' className='flex items-center justify-center h-full hover:bg-slate-100 px-4 cursor-pointer hover:underline'>
                        About Zypaws - RescuePet
                    </NavLink>
                </li>
                <li className='h-full'>
                    <NavLink to='/blog' className='flex items-center justify-center h-full hover:bg-slate-100 px-4 cursor-pointer hover:underline'>
                        Good Reads
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Header;
