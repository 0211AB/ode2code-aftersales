import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import AuthContext from '../contexts/AuthContext';
import { formToJSON } from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader';

const SignIn = () => {
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault();
        setData(formToJSON(new FormData(document.getElementById('signin-form'))))
    }

    useEffect(() => {
        if (data === null) return;
        setLoading(true)
        const register = async () => {

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}user/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            const res_data = await res.json()

            if (res.status === 404) {
                toast({
                    title: 'Error Logging In To Account.',
                    description: res_data.Message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                setLoading(false)
            }
            else {
                toast({
                    title: 'Login Successful.',
                    description: `${res_data.Message}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })

                authCtx.login(res_data.token, res_data.ID,res_data.user);
                navigate(`/`)
            }
        };

        if (data !== null)
            register();
        // eslint-disable-next-line
    }, [data])

    if (loading === true)
        return <Loader />

    return (
        <>
            <ToastContainer autoClose={1000} theme='colored' />

            <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Link to="/" className="items-center gap-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900 text-center justify-center">
                        <SiShopware /> <span>mobiFix</span>
                    </Link>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
                        Sign In to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" id='signin-form' onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500">
                                    Password (123456)
                                </label>
                                <div className="text-sm">
                                    <p onClick={() => toast.error("Feature Coming Soon!")} className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                        Forgot password?
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-500">User Role</legend>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        name="role"
                                        value="user"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-400">
                                        User (user@example.com)
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        name="role"
                                        value="service-center"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="service-center" className="block text-sm font-medium leading-6 text-gray-400">
                                        ServiceCenter (servicecenter@example.com)
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        name="role"
                                        value="customer-support"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="customer-support" className="block text-sm font-medium leading-6 text-gray-400">
                                        CustomerSupport (customersupport@example.com)
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        name="role"
                                        value="admin"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="admin" className="block text-sm font-medium leading-6 text-gray-400">
                                        Admin (admin@example.com)
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        name="role"
                                        value="warehouse"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="warehouse" className="block text-sm font-medium leading-6 text-gray-400">
                                        Warehouse (warehouse@example.com)
                                    </label>
                                </div>
                            </div>
                        </fieldset>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SignIn