import React, { useEffect, useState, useContext } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import AuthContext from '../contexts/AuthContext';
import moment from 'moment'
import { formToJSON } from 'axios'

import { MdPhonelinkSetup } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader';

const colorSchemes = [
    {
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
        pcColor: 'green-600',
    },
    {
        iconColor: 'rgb(0, 194, 146)',
        iconBg: 'rgb(235, 250, 242)',
        pcColor: 'red-600',
    },
    {
        iconColor: 'rgb(255, 244, 229)',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'green-600',
    },
    {
        iconColor: 'rgb(228, 106, 118)',
        iconBg: 'rgb(255, 244, 229)',
        pcColor: 'green-600',
    },
    {
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
        pcColor: 'red-600',
    },
];

const ServiceHelp = () => {
    const { currentColor } = useStateContext();
    const authCtx = useContext(AuthContext)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [queryData, setQueryData] = useState(null)
    const [updateData, setUpdateData] = useState(null)

    const submitHandler = (e) => {
        e.preventDefault();
        setData(formToJSON(new FormData(document.getElementById('update-form'))))
    }

    const queryHandler = (e) => {
        e.preventDefault();
        setUpdateData(formToJSON(new FormData(document.getElementById('query-form'))))
    }

    useEffect(() => {
        if (data === null) return;
        setLoading(true)
        const getData = async () => {

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}${data.type === 'previous-order' ? '/request/id' : '/order/admin'}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                },
                body: JSON.stringify(data)
            });

            const res_data = await res.json()

            if (res.status === 404) {
                toast.error(`Error Fetching Data !! ${res_data.message}`)
            }
            else
                setQueryData(res_data)

            setLoading(false)
        };

        if (data !== null)
            getData();
        // eslint-disable-next-line
    }, [data])

    useEffect(() => {
        if (updateData === null) return;
        setLoading(true)
        const getData = async () => {

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}request/update?id=${queryData._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                },
                body: JSON.stringify(updateData)
            });

            const res_data = await res.json()

            if (res.status === 404)
                toast.error(`Error Updating Data !! ${res_data.message}`)
            else {
                setQueryData(res_data._doc)
                toast.success(`Updated Data Successfully!! ${res_data.message}`)
            }

            setLoading(false)
        };

        if (updateData !== null)
            getData();
        // eslint-disable-next-line
    }, [updateData])

    if (loading === true)
        return <Loader />

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <ToastContainer autoClose={1000} theme='colored' />

            {queryData === null && <form className="space-y-6" id='update-form' onSubmit={submitHandler}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
                        Get Order Details
                    </h2>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">
                        User Email address
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
                        <label htmlFor="order" className="block text-sm font-medium leading-6 text-gray-500">
                            Order ID
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="order"
                            name="order"
                            type="order"
                            required
                            autoComplete="current-order"
                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-500">Order Type</legend>
                    <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                            <input
                                name="type"
                                value="pickup"
                                type="radio"
                                required
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="pickup" className="block text-sm font-medium leading-6 text-gray-400">
                                Query Related To Pickup Of Device
                            </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <input
                                name="type"
                                value="previous-order"
                                type="radio"
                                required
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="delivery" className="block text-sm font-medium leading-6 text-gray-400">
                                Query Related To Previous Order
                            </label>
                        </div>
                    </div>
                </fieldset>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Find Data
                    </button>
                </div>
            </form>}

            {queryData && Array.isArray(queryData) === false && <form className="space-y-6" id='query-form' onSubmit={queryHandler}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
                        Order ID  {queryData._id}
                    </h2>
                </div>

                <div className="mt-10 w-72 md:w-400">
                    {queryData.requestedParts.map((item, idx) => (
                        <div key={idx} className="flex justify-between mt-4">
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    style={{
                                        color: colorSchemes[idx % 5].iconColor,
                                        backgroundColor: colorSchemes[idx % 5].iconBg,
                                    }}
                                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                                >
                                    <MdPhonelinkSetup />
                                </button>
                                <div>
                                    <p className="text-md text-gray-200 font-semibold">{item.type}</p>
                                    <p className="text-sm text-gray-400">{item.name.substring(0, 30)}</p>
                                </div>
                            </div>
                            <p className='text-gray-200'>Rs {item.price}</p>
                        </div>
                    ))}
                </div>

                <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-400">Priority Level</legend>
                    <div className="relative">
                        <select name="priorityLevel" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option value='low' selected={queryData.priorityLevel === 'low' ? true : false}>LOW</option>
                            <option value='medium' selected={queryData.priorityLevel === 'medium' ? true : false}>MEDIUM</option>
                            <option value='high' selected={queryData.priorityLevel === 'high' ? true : false}>HIGH</option>
                            <option value='urgent' selected={queryData.priorityLevel === 'urgent' ? true : false}>URGENT</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-400">Status</legend>
                    <div className="relative">
                        <select name="status" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            {["pending-approval", "in-progress", "dispatched-from-warehouse", "in-transit", "completed", "rejected"].map((item) => {
                                return <option key={item} value={item} selected={queryData.status === item ? true : false}>{item}</option>
                            })}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </fieldset>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Update Order
                    </button>

                    <button
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
                        onClick={() => { setQueryData(null) }}
                    >
                        Reset
                    </button>
                </div>
            </form>}

            {queryData && Array.isArray(queryData) === true && <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-3 m-3 flex justify-center items-center gap-10" id='query-form' onSubmit={queryHandler}>
                <div className='w-full'>
                    <p className="text-xl font-semibold">Order {queryData[0]._id}</p>
                    <p className="text-lg font-semibold ">{moment(queryData[0].createdDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p className="text-gray-400">{queryData[0].address}</p>
                    <div className="flex gap-4 mt-4">
                        <p
                            style={{ background: 'orange' }}
                            className="cursor-pointer hover:drop-shadow-xl text-gray-900 py-1.5 px-3 rounded-lg text-xs"
                        >
                            SkuID : {queryData[0].model?.skuId}
                        </p>
                        <p
                            style={{ background: '#FB9678' }}
                            className="cursor-pointer hover:drop-shadow-xl text-gray-900 py-1.5 px-3 rounded-lg text-xs"
                        >
                            Model : {queryData[0].model?.name}
                        </p>
                    </div>
                    <div className="flex gap-4 mt-4">

                        <button
                            style={{ background: currentColor }}
                            className="cursor-pointer hover:drop-shadow-xl text-white py-1.5 px-3 rounded-lg text-s"
                            onClick={() => { setQueryData(null) }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ServiceHelp