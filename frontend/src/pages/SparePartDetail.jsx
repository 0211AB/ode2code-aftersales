import { useLocation } from 'react-router-dom'
import React, { useEffect, useState, Suspense } from 'react';
import { Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import Loader from '../components/Loader';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const SparePartDetail = () => {
    const { state } = useLocation()
    const authCtx = useContext(AuthContext)
    const { currentColor, cart, setCart } = useStateContext();
    const [loading, setLoading] = useState(true);
    const [parts, setParts] = useState([]);
    const [notifData, setNotifData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}notifications/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                },
                body: JSON.stringify(notifData)
            });

            const res_data = await res.json();

            if (res.status === 200)
                toast.success(res_data.message)
            else
                toast.error(res_data.message)
        };

        if (notifData !== null)
            getData();

        // eslint-disable-next-line
    }, [notifData]);

    const renderProductCard = (product) => (
        <div key={`${product.sku}-${product.name}`} className="flex flex-col justify-between w-full md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-2 md:p-6 m-3">

            <div className="flex justify-between">
                <p className="text-xl font-semibold">{product.name.substring(0, 20)}</p>
                <button type="button" className="text-xl font-semibold text-gray-400">
                    {product.description}
                </button>
            </div>
            <p className={`text-xs text-center cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 ${product.available ? 'bg-green-400' : 'bg-red-400'} py-0.5 px-2 text-gray-800 mt-2`}>
                {product.available ? 'AVAILABLE' : 'OUT OF STOCK'}
            </p>

            <div className="flex gap-4 border-b-1 border-color mt-6">
                <div className="border-r-1 border-color pr-4 pb-2">
                    <p className="text-xs text-gray-400">{product.quantity}</p>
                    <p className="text-sm">Quanity</p>
                </div>
                <div className="border-r-1 border-color pr-4 pb-2">
                    <p className="text-xs text-gray-400">{product.locations}</p>
                    <p className="text-sm">WareHouse</p>
                </div>
                <div className="border-r-1 border-color pr-4 pb-2">
                    <p className="text-xs text-gray-400">{product.type}</p>
                    <p className="text-sm">Type</p>
                </div>
                <div className="border-r-1 border-color pr-4 pb-2">
                    <p className="text-sm">{product.sku}</p>
                    <p className="text-sm">SKU</p>
                </div>
            </div>
            {product.crossCompatibleModels.length > 0 && <div className="mt-2">
                <p className="text-md font-semibold mb-2">Comaptible Models</p>
                <div className="flex flex-row flex-wrap gap-4">
                    {product.crossCompatibleModels.map((item, index) => (
                        <div className='w-5/12 flex gap-3 item-center'><img key={index} className="rounded-lg w-8 h-8" src={item.image} alt={item.name} />
                            <p className="text-xs text-gray-400">{item.name}</p></div>
                    ))}
                </div>
            </div>}
            <div className="flex justify-between items-end mt-5">
                <div className="mt-3">
                    {product.available ? cart.includes(product) ? (
                        <button
                            style={{ backgroundColor: 'rgb(239 68 68)', color: 'white', borderRadius: '10px' }}
                            className={` text-3 p-3 w-full hover:drop-shadow-xl`}
                            onClick={() => setCart(cart.filter((c) => c._id !== product._id))}
                        >
                            Remove from Cart
                        </button>
                    ) : (
                        <Button
                            color="white"
                            bgColor={currentColor}
                            text="Add to Cart"
                            borderRadius="10px"
                            cartButton='true'
                            cartProd={product}
                        />
                    ) : <button
                        type="button"
                        onClick={() => { setNotifData({ name: authCtx.user?.fullName, modelName: product.name, modelSkuId: product.sku }) }}
                        className='p-2'
                        style={{ backgroundColor: 'rgb(239 68 68)', color: 'white', borderRadius: "10px" }}
                    >
                        Notify WareHouse
                    </button>}
                </div>

                <p className="text-gray-100 text-sm">Rs {product.price}</p>
            </div>
        </div>
    );


    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}spare/category?name=${state}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
        <div className="mt-24 md:mt-10">
            <ToastContainer autoClose={1000} theme='colored'/>
            <div className="flex gap-1 flex-wrap justify-center">
                <div className="bg-white dark:text-gray-200 w-full dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780 ">
                    <div className="flex justify-between flex-col md:flex-row">
                        <p className="font-semibold text-xl text-center md:text-left">{state}</p>
                        <div className="flex items-center gap-4">
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center">
                {loading ? (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Loader />
                    </Suspense>
                ) : (
                    <React.Fragment>
                        {loading === false && parts.map(renderProductCard)}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

export default SparePartDetail