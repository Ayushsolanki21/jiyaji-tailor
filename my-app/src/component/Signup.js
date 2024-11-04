import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const auth = localStorage.getItem('user');

    useEffect(() => {
        if (auth) {
            navigate('/');
        }
    }, [auth, navigate]);

    const submitHandle = async (e) => {
        alert("hkabd");
        e.preventDefault();
        setError(null); 
        try {
            const response = await fetch('http://localhost:5001/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to register, please check your input.');
            }

            const result = await response.json();
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        } catch (e) {
            setError(e.message || 'An error occurred');
        }
    };

    return (
        <div className="form">
            <div className="flex justify-center bg-[#C3AA80]">
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://cdn.pixabay.com/photo/2023/09/22/15/45/panda-8269336_1280.png"
                            alt="logo"
                        />
                        <h1 className="text-2xl font-bold">AYUSH SHOP</h1>
                        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                                    Create an account
                                </h1>
                                {error && <div className="text-red-600">{error}</div>}
                                <form className="space-y-4 md:space-y-6" onSubmit={submitHandle}>
                                    <div>
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            UserName
                                        </label>
                                        <input
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder="UserName"
                                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Your email
                                        </label>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="name@company.com"
                                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Password
                                        </label>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="terms"
                                                type="checkbox"
                                                className="w-4 h-4 border bg-gray-50 dark:bg-gray-700"
                                                required
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                                I accept the{' '}
                                                <button className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                                    Terms and Conditions
                                                </button>
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-[#EBE4DB] rounded-lg text-sm px-5 py-2.5"
                                    >
                                        Create an account
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account?{' '}
                                        <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Login here
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Signup;
