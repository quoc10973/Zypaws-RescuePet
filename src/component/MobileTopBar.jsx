import React from 'react';

const MobileTopBar = () => {
    return (
        <div className="left-0 w-full bg-gray-100 text-gray-800 px-4 py-3 text-center shadow-md z-50 flex justify-between items-center sm:hidden">
            <p className="text-sm font-quicksand max-w-md mx-auto flex items-center gap-2">

                <span>
                    <a href="#" className="text-purple-600 font-semibold hover:underline">
                        Learn more
                    </a>{' '}
                    about how we make a difference.
                </span>
            </p>
        </div>
    );
};

export default MobileTopBar;
