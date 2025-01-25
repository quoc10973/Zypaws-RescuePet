import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import từ react-icons

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 font-quicksand">
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <div className="flex flex-wrap justify-between items-start mb-12">
                    {/* About Section */}
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Create Happiness - Save Lives</h3>
                        <p className="text-sm leading-6 max-w-xs ">
                            Zypaws-PetRescue is dedicated to rescuing abandoned pets and finding them forever homes.
                        </p>
                        <p className="text-sm leading-6 mt-4 max-w-xs">
                            Our mission is to promote animal welfare and connect kind-hearted people with pets in need.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/donation" className="text-sm hover:underline hover:text-yellow-400">Donate for us </Link>
                            </li>
                            <li>
                                <Link to="/adopt" className="text-sm hover:underline hover:text-yellow-400">Adopt a Pet</Link>
                            </li>
                            <li>
                                <Link to="/volunteer" className="text-sm hover:underline hover:text-yellow-400">Volunteers</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm hover:underline hover:text-yellow-400">Contact to Zypaws</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-sm hover:underline hover:text-yellow-400">FAQs</Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-sm hover:underline hover:text-yellow-400">Blog - A place to know your pet</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Pet Care Tips */}
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Pet Care Tips</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/pet-care/proper-feeding" className="text-sm hover:underline hover:text-yellow-400">Proper Feeding for Your Dog</Link>
                            </li>
                            <li>
                                <Link to="/pet-care/training-puppy" className="text-sm hover:underline hover:text-yellow-400">How to Train Your New Puppy</Link>
                            </li>
                            <li>
                                <Link to="/pet-care/grooming" className="text-sm hover:underline hover:text-yellow-400">Tips for Grooming Your Pet</Link>
                            </li>
                            <li>
                                <Link to="/pet-care/health" className="text-sm hover:underline hover:text-yellow-400">Keeping Your Pet Healthy and Happy</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-sm leading-6">
                            Email: <a href="mailto:info@zypaws.com" className="hover:underline hover:text-yellow-400">info@zypaws.com</a>
                        </p>
                        <p className="text-sm leading-6">Phone: (123) 456-7890</p>
                        <p className="text-sm leading-6 mt-4">
                            Address: 123 Pet Lane, Happy Town, CA 90210
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                                <FaFacebookF className="h-6 w-6" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                                <FaTwitter className="h-6 w-6" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                                <FaInstagram className="h-6 w-6" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                                <FaLinkedin className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="flex flex-wrap justify-between items-start border-t border-gray-700 pt-8 mb-8">
                    {/* Newsletter Section */}
                    <div className="w-full md:w-1/2 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                        <p className="text-sm leading-6 mb-4">
                            Subscribe to our newsletter to get the latest updates on events, adoptions, and success stories.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow p-2 rounded-l-lg text-gray-800 focus:outline-none max-w-sm"
                            />
                            <button
                                type="submit"
                                className="bg-yellow-500 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-600"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Testimonials Section */}
                    <div className="w-full md:w-1/2">
                        <h3 className="text-lg font-semibold mb-4 mt-1">What People Say</h3>
                        <blockquote className="text-sm leading-6 italic text-gray-400">
                            "Zypaws is an amazing organization. Thanks to them, I found my best friend, Luna!" - Jane D.
                        </blockquote>
                        <blockquote className="text-sm leading-6 italic text-gray-400 mt-4">
                            "Their dedication to animal welfare is inspiring. I love volunteering here!" - Mark T.
                        </blockquote>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 pt-4">
                    <p className="text-sm text-center">&copy; 2025 Zypaws-PetRescue. All rights reserved. | <Link to="/terms" className="hover:underline">Terms of Service</Link> | <Link to="/privacy" className="hover:underline">Privacy Policy</Link></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
