import React, { useState, useEffect, useRef } from 'react';
import Banner from '../component/Banner';

const HomePage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    // Kiểm tra xem phần tử có vào trong vùng nhìn thấy không khi cuộn chuột
    const handleScroll = () => {
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
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
                <div className="text-center items-start space-y-4 p-12">
                    <p className="font-playwrite font-bold text-green-700 text-1xl sm:text-2xl md:text-3xl lg:text-4xl">
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
                        className={`text-justify font-quicksand text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <b>For almost two decades</b>, PetRescue has been at the forefront of the animal rescue movement, tirelessly working to raise awareness about pet adoption and saving lives.
                        We've provided rescue, rehabilitation, and rehoming services to thousands of abandoned and stray animals, giving them a second chance at a better life.
                        <br />
                        <br />
                        <b>Our work</b> has made a significant difference in the Australian rescue community, inspiring thousands of people to adopt and care for animals in need.
                        But, until every pet is safe, respected, and loved, we all still have big, hairy work to do. Find out more about our mission to help save 100,000 healthy and rehomable pets each year.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
