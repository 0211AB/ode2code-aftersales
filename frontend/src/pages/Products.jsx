import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { GoPackage } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { RxReload } from 'react-icons/rx'
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Loader = lazy(() => import('../components/Loader'));
const Button = lazy(() => import('../components/Button'));

const NoData = () => {
  return <div className="dark:text-gray-200 m-3 p-4 rounded-2xl md:w-780 ">
    <div className="flex justify-between flex-col md:flex-row">
      <p className="font-semibold text-xl text-center md:text-left">No Models Found ...</p>
      <div className="flex items-center gap-4">
        <p className={`flex items-center gap-2 text-red-400 hover:drop-shadow-xl cursor-pointer`}>
          <span>
            <RxReload />
          </span>
          <span>Try another keyword</span>
        </p>
      </div>
    </div>
  </div>
}

const Products = () => {
  const { currentColor } = useStateContext();
  const [isPopular, setIsPopular] = useState(0);
  const [loading, setLoading] = useState(true);
  const [latestProducts, setLatestProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([])
  const [textSearch, setTextSearch] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}products/home`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res_data = await res.json();
      setLatestProducts(res_data.p2);
      setPopularProducts(res_data.p1);
      setLoading(false);
    };

    if (latestProducts.length === 0)
      getData();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}products/search?text=${textSearch}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res_data = await res.json();
      setSearchProducts(res_data);
      setTextSearch("");
      setLoading(false);
    };

    if (textSearch !== "")
      getData();

  }, [textSearch]);

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
          <div className="flex justify-between flex-col md:flex-row">
            <p className="font-semibold text-xl text-center md:text-left">Mobile Phone Models</p>
            <div className="flex items-center gap-4">
              <p className={`flex items-center gap-2 ${isPopular === 1 ? 'text-green-400' : 'text-gray-400'} hover:drop-shadow-xl cursor-pointer`} onClick={() => { setIsPopular(1) }}>
                <span>
                  <GoPackage />
                </span>
                <span>Popular Models</span>
              </p>
              <p className={`flex items-center gap-2 ${isPopular === 0 ? 'text-green-400' : 'text-gray-400'} hover:drop-shadow-xl cursor-pointer`} onClick={() => { setIsPopular(0) }}>
                <span>
                  <GoPackage />
                </span>
                <span>Latest Models</span>
              </p>
              <p className={`flex items-center gap-2 text-blue-400 hover:drop-shadow-xl cursor-pointer`} onClick={() => { navigate('/product/all') }}>
                <span>
                  <GoPackage />
                </span>
                <span>All  Models</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between md:flex-row">
            <input type='text' className='dark:bg-secondary-dark-bg sm:text-center md:text-left focus:outline-none w-full' placeholder='Search for models...' ref={inputRef} />
            <div className="flex items-center gap-4" onClick={() => {
              setTextSearch(inputRef.current.value)
              setLoading(true)
              setIsPopular(2)
            }}>
              <p className={`flex items-center gap-2 text-gray-400 hover:drop-shadow-xl cursor-pointer`} >
                <span>Search</span>
                <span >
                  <AiOutlineSearch />
                </span>
              </p>
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
            {isPopular === 0 && loading === false && popularProducts.map(renderProductCard)}
            {isPopular === 1 && loading === false && latestProducts.map(renderProductCard)}
            {isPopular === 2 && loading === false && searchProducts.length === 0 ? <NoData /> : searchProducts.map(renderProductCard)}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Products;
