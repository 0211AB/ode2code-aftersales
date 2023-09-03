import React, { useEffect, useState, lazy, Suspense } from 'react';
import { IoIosMore } from 'react-icons/io';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Loader = lazy(() => import('../components/Loader'));
const Button = lazy(() => import('../components/Button'));

const Footer = ({ page, setPage, total }) => {
    const { currentColor } = useStateContext();

    return <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
            <div
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => {
                    if (page > 1)
                        setPage((prevPage) => Number(prevPage) - 1)
                }}
            >
                Previous
            </div>
            <div
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => {
                    if (page < total)
                        setPage((prevPage) => Number(prevPage) + 1)
                }}
            >
                Next
            </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-500">
                    Showing <span className="font-medium">{(page - 1) * 12 + 1}</span> to <span className="font-medium">{(page) * 12}</span> of{' '}
                    <span className="font-medium">{total * 12}</span> results
                </p>
            </div>
            <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <div
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:text-gray-800"

                        onClick={() => {
                            if (page > 1)
                                setPage((prevPage) => Number(prevPage) - 1)
                        }}
                    >
                        <span className="sr-only">Previous</span>
                        <BsChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </div>
                    {Array.from({ length: total }).map((num, idx) => {

                        if (Number(page) === idx + 1)
                            return <div
                                aria-current="page"
                                style={{ 'backgroundColor': currentColor }}
                                className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {idx + 1}
                            </div>
                        return (<div
                            aria-current="page"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0 md:inline-flex cursor-pointer"

                            onClick={() => {
                                setPage(idx + 1)
                            }}
                        >
                            {idx + 1}
                        </div>)
                    })}

                    <div
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:text-gray-800"

                        onClick={() => {
                            if (page < total)
                                setPage((prevPage) => Number(prevPage) + 1)
                        }}
                    >
                        <span className="sr-only">Next</span>
                        <BsChevronRight className="h-5 w-5" aria-hidden="true" />
                    </div>
                </nav>
            </div>
        </div>
    </div>
}

const AllProducts = () => {
    const { currentColor } = useStateContext();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}products/all?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const res_data = await res.json();
            
            setPage(res_data.currentPage)
            setProducts(res_data.products)
            setTotal(res_data.totalPages)
            setLoading(false);
        };

        getData();

        // eslint-disable-next-line
    }, [page]);

    const renderProductCard = (product) => (
        <div key={product.skuId} className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
            <div className="flex justify-between">
                <p className="text-xl font-semibold">{product.name}</p>
                <button type="button" className="text-xl font-semibold text-gray-500">
                    <IoIosMore />
                </button>
            </div>
            <div className="flex justify-between gap-4 mt-10 md:flex-row">
                <img
                    className="w-24 md:w-36"
                    src={product.image}
                    alt={product.skuId}
                />
                <div className="flex flex-col gap-1 mt-8">
                    <p className="font-semibold text-lg">skuId : {product.skuId}</p>
                    <p className="text-sm text-gray-400">
                        {product.display.dimensions === "" ? '' : 'Dimensions : '}{product.display.dimensions}
                    </p>
                    <p className="text-sm text-gray-400">
                        {product.display.size === "" ? '' : 'Size : '}{product.display.size}
                    </p>
                    <p className="text-sm text-gray-400">
                        {product.description === "" ? '' : 'Description : '}{product.description}
                    </p>
                    <div className="mt-3" onClick={() => { navigate('/product/details', { state: product }) }}>
                        <Button
                            color="white"
                            bgColor={currentColor}
                            text="More Details"
                            borderRadius="10px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="mt-24 md:mt-10">
            <div className="flex gap-1 flex-wrap justify-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780 ">
                    <div className="flex justify-center">
                        <p className="font-semibold text-xl text-center">All Mobile Phone Models</p>
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
                        {loading === false && products.length > 0 && products.map(renderProductCard)}
                    </React.Fragment>
                )}
            </div>

            <Footer page={page} setPage={setPage} total={total} />
        </div>
    );
}

export default AllProducts