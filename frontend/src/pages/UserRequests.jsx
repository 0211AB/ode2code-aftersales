import React, { useEffect, useState, Suspense, useContext } from 'react';
import { Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import Loader from '../components/Loader';
import AuthContext from '../contexts/AuthContext';
import { MdPhonelinkSetup } from 'react-icons/md'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

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

const UserRequests = () => {
    const { currentColor } = useStateContext();
    const [loading, setLoading] = useState(true);
    const [parts, setParts] = useState([]);
    const authCtx = useContext(AuthContext)
    const navigate=useNavigate()

    const renderProductCard = (product, idx) => (
        <div key={idx} className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
            <div className="flex flex-col justify-between items-center gap-2">
                <p className="text-xl font-semibold">Transaction #{idx + 1}</p>
                <p className="text-l font-semibold">Estimated Delivery {moment(product.estimatedDeliveryDate).startOf('day').fromNow()}</p>
                <div className="flex gap-4">
                    <p
                        style={{ background: 'orange' }}
                        className="cursor-pointer hover:drop-shadow-xl text-gray-900 py-1.5 px-3 rounded-lg text-xs"
                    >
                        STATUS : {product.status.toUpperCase()}
                    </p>
                    <p
                        style={{ background: '#FB9678' }}
                        className="cursor-pointer hover:drop-shadow-xl text-gray-900 py-1.5 px-3 rounded-lg text-xs"
                    >
                        PRIORITY : {product.priorityLevel.toUpperCase()}
                    </p>
                </div>
            </div>
            <div className="mt-10 w-72 md:w-400">
                {product.requestedParts.map((item, idx) => (
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
                                <p className="text-md font-semibold">{item.type}</p>
                                <p className="text-sm text-gray-400">{item.name.substring(0, 30)}</p>
                            </div>
                        </div>
                        <p className={`text-${colorSchemes[idx % 5].pcColor}`}>Rs {item.price}</p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col justify-between items-center mt-5 border-t-1 border-color">
                <p className="text-gray-200 text-lg">Total Rs {product.price}</p>
                <p className="text-gray-400 text-sm">ID {product._id}</p>

                <div className="mt-3" onClick={()=>{navigate('/customer-service')}}>
                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="Contact Customer Care"
                        borderRadius="10px"
                    />
                </div>
            </div>
        </div>
    );


    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}request/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                },
            });

            const res_data = await res.json();
            setParts(res_data)
            setLoading(false);
        };

        if (parts.length === 0)
            getData();

        // eslint-disable-next-line
    }, []);
    return (
        <div className="mt-24 md:mt-10 mb-24">
            <div className="flex gap-1 flex-wrap justify-center">
                <div className="bg-white dark:text-gray-200 w-full dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780 ">
                    <div className="flex justify-between flex-col md:flex-row">
                        <p className="font-semibold text-xl text-center md:text-left">{authCtx.user?.fullName}'s ORDER HISTORY</p>
                        <div className="flex items-center gap-4">
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-stretch gap-10 justify-center">
                {loading ? (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Loader />
                    </Suspense>
                ) : (
                    <React.Fragment>

                        {loading === false && parts.length > 0 && parts.map(renderProductCard)}
                        {parts.length === 0 && <div className="flex justify-between flex-col md:flex-row">
                            <p className="font-semibold text-xl text-gray-400 text-center md:text-left">No Products Found</p>
                            <div className="flex items-center gap-4">
                            </div>
                        </div>}
                    </React.Fragment>
                )}
            </div>
        </div>)
}

export default UserRequests