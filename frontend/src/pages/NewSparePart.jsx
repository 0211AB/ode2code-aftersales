import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { formToJSON } from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const animatedComponents = makeAnimated();

const NewSparePart = () => {
    const [data, setData] = useState([])
    const [formData, setFormData] = useState(null)
    const authCtx = useContext(AuthContext)
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}spare/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                },
                body: JSON.stringify(formData)
            });

            const res_data = await res.json();

            if (res.status === 200)
                toast.success(res_data.message)
            else
                toast.error(res_data.message)
        };

        if (formData !== null)
            getData();

        // eslint-disable-next-line
    }, [formData])

    const submitHandler = (e) => {
        e.preventDefault()
        setFormData({
            ...formToJSON(new FormData(document.getElementById('new-spare-form'))),
            compatible: selected
        })
    }

    console.log(formData)

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}products/all-list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                },
            });

            const res_data = await res.json();

            if (res.status === 200)
                setData(res_data.map((item) => {
                    return { value: item._id, label: item.skuId + " " + item.name.substring(0, 20) }
                }))
        };

        if (data.length === 0)
            getData();

        // eslint-disable-next-line
    }, [])

    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
    };

    return (
        <div className="mt-24 md:mt-10">
            <ToastContainer autoClose={1000} theme='colored' />
            <div className="flex gap-1 flex-wrap justify-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780 ">
                    <div className="flex justify-center">
                        <p className="font-semibold text-xl text-center">Add New Spare Part</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-1 flex-wrap justify-center">
                <div className="flex justify-center bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl w-full md:w-780 ">
                    <form id='new-spare-form' className='w-full' onSubmit={submitHandler}>
                        <div className="space-y-12">

                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-500">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                required
                                                className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="sku" className="block text-sm font-medium leading-6 text-gray-500">
                                            SKU
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="sku"
                                                id="sku"
                                                required
                                                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-500">
                                            Compatible Models
                                        </label>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            onChange={handleChange}
                                            options={data}
                                        />
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-500">
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="description"
                                                id="description"
                                                required
                                                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-500">
                                            Price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="price"
                                                id="price"
                                                required
                                                className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-500">
                                            Quantity
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="quantity"
                                                id="quantity"
                                                required
                                                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-500">Category</legend>
                                            <div className="relative">
                                                <select name="category" required className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-800">
                                                    {['Back Housing', 'Battery', 'Charger', 'Data Cable', 'LCD Module', 'LCM', 'Mainboard', 'PCB', 'Sideboard', 'Speaker'].map((item, idx) => <option key={idx} value={item}>{item}</option>)}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-500">WareHouse Location</legend>
                                            <div className="relative">
                                                <select name="warehouse" required className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-800">
                                                    <option value='North'>North</option>
                                                    <option value='South'>South</option>
                                                    <option value='East'>East</option>
                                                    <option value='West'>West</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <input type="reset" className="text-sm font-semibold leading-6 text-gray-500 cursor-pointer" />
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default NewSparePart