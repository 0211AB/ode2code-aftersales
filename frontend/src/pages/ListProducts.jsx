import React, { useContext, useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { FaArrowTrendUp } from 'react-icons/fa6'
import { MdPhonelinkSetup } from 'react-icons/md'
import { formToJSON } from 'axios'
import Loader from '../components/Loader';

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

const ListProduct = () => {
    const { state } = useLocation()
    const [data, setData] = useState(state)
    const toolbarOptions = ['Search'];
    const editing = { allowDeleting: false, allowEditing: false };
    const [loading, setLoading] = useState(false)
    const [updateData, setUpdateData] = useState(null)
    const [queryData, setQueryData] = useState(null)
    const authCtx = useContext(AuthContext)


    const queryHandler = (e) => {
        e.preventDefault()
        setUpdateData(formToJSON(new FormData(document.getElementById('update-query-form'))))
    }

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

            console.log(res_data)

            if (res.status === 404)
                toast.error(`Error Updating Data !! ${res_data.message}`)
            else {
                toast.success(`Updated Data Successfully!! ${res_data.message}`)
            }

            setLoading(false)
        };

        if (updateData !== null)
            getData();
        // eslint-disable-next-line
    }, [updateData])



    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}request/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                }
            });

            const res_data = await res.json();

            if (res.status === 200)
                setData(res_data.map((item) => { return { name: item.user.fullName, email: item.user.email, ...item } }))
            else
                toast.error(res_data.message)
        };

        if (data === null)
            getData();

        // eslint-disable-next-line
    }, []);

    function queryStockTemplate(props) {
        return <button
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={() => { setQueryData(props) }}
        >
            <FaArrowTrendUp />
        </button>
    }

    if (loading === true)
        return <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gry-500 rounded-3xl">
            <ToastContainer autoClose={1000} theme='colored' /><Loader /></div>
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gry-500 rounded-3xl">
            <ToastContainer autoClose={1000} theme='colored' />
            <Header category="Page" title="Part Requests List" />
            {queryData === null && <GridComponent
                dataSource={data}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                editSettings={editing}
                toolbar={toolbarOptions}
            >
                <ColumnsDirective>
                    <ColumnDirective field='name' headerText='User Name' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='email' headerText='User Email' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='price' headerText='Price' width='50' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='status' headerText='Status' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='priorityLevel' headerText='Priority Level' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='estimatedDeliveryDate' headerText='Delivery Date' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective headerText='query' width='150' textAlign='Center' template={queryStockTemplate} />
                </ColumnsDirective>
                <Inject services={[Toolbar, Search, Page]} />

            </GridComponent>}
            {queryData !== null && <div className='w-full flex justify-center align-center'><form className="md:w-780  space-y-6" id='update-query-form' onSubmit={queryHandler}>
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
                        <select name="priorityLevel" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" defaultValue={queryData.priorityLevel}>
                            <option value='low'>LOW</option>
                            <option value='medium' >MEDIUM</option>
                            <option value='high'>HIGH</option>
                            <option value='urgent'>URGENT</option>
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

                <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-400">Estimated Delivery Date</legend>
                    <div className="relative">
                        <input type="datetime-local" defaultValue={queryData.estimatedDeliveryDate} name="estimatedDeliveryDate" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        </input>
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
            </form></div>}
        </div>
    );
};
export default ListProduct;