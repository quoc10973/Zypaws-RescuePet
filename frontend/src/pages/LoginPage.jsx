import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { loginAPI, loginGoogleAPI } from '../axios/axios.api';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAPI(email, password);
            console.log('Login successful:', response);
            console.log(response);
            localStorage.setItem('accessToken', response.accessToken);
            setAuth({
                isAuthenticated: true,
                user: {
                    id: response.id,
                    email: response.email,
                    name: response.firstName,
                    role: response.role
                }
            });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_BACKEND_URL + '/authenticate/login-google';
    };

    return (
        <div className='flex flex-col items-center justify-center p-10 space-y-10'>
            <div>
                <h1 className='text-xl font-bold text-center mb-4'>
                    Hello, hooman! Sign in to access your free PetRescue features & pawsome tools.
                </h1>
                <p className='text-center mb-6'>
                    Don't have an account? <NavLink to='/register' className='text-blue-500 hover:underline'>Sign up</NavLink>
                </p>
            </div>
            <div className='w-full max-w-sm'>
                <form onSubmit={handleLogin}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium'>Email</label>
                        <div className='relative'>
                            <input
                                type='email'
                                className='w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                placeholder='Enter your email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <UserIcon className='h-5 w-5 absolute right-3 top-3 text-gray-400' />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium'>Password</label>
                        <div className='relative'>
                            <input
                                type='password'
                                className='w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                placeholder='Enter your password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
                    <div className='flex items-center justify-between mb-4'>
                        <label className='flex items-center text-sm'>
                            <input type='checkbox' className='mr-2' /> Remember me
                        </label>
                        <NavLink to='/forgot-password' className='text-blue-500 text-sm hover:underline'>Forgot password?</NavLink>
                    </div>
                    <div className='space-y-4'>
                        <button
                            type='submit'
                            className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300'
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={handleGoogleLogin} // Gọi API khi click
                            className="w-full flex items-center justify-center gap-2 border border-red-400 text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition duration-300"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google Logo"
                                className="h-5 w-5"
                            />
                            Login with Google
                        </button>
                    </div>

                </form>
            </div>
        </div >
    );
};

export default LoginPage;
