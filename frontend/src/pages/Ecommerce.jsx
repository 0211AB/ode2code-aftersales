import React, { useContext, useEffect, useState } from 'react';
import { Stacked, Button, LineChart, SparkLine } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import Loader from '../components/Loader';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const { currentColor } = useStateContext();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}spare/quantity`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${authCtx.token}`
        },
      });

      const res_data = await res.json();
      setData(res_data)
      setLoading(false);
    };

    if (data.length === 0)
      getData();

    // eslint-disable-next-line
  }, []);

  if (loading)
    return <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
      <div className="flex justify-between items-center gap-2">
        <p className="text-xl font-semibold">Restock Products</p>
      </div>
      <div className="mt-10 w-72 md:w-400">
        <Loader />
      </div>
    </div>

  return <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
    <div className="flex justify-between items-center gap-2">
      <p className="text-xl font-semibold">Restock Products</p>
    </div>
    <div className="mt-10 w-72 md:w-400">
      {data.splice(0, 6).map((item) => (
        <div key={item.name} className="flex justify-between flex-col mt-4 gap-2">
          <div className="flex gap-4">
            <button
              type="button"
              style={{
                color: 'white',
                backgroundColor: 'rgb(239 68 68)',
              }}
              className="text-md rounded-lg p-4 hover:drop-shadow-xl"
            >
              {item.quantity} Remaining
            </button>
            <div>
              <p className="text-md font-semibold">{item.name.substring(0, 28)}</p>
              <p className="text-sm text-gray-400">Category : {item.type}</p>
              <p className="text-sm text-gray-400">SKU : {item.sku}</p>
            </div>
          </div>
          <p className='text-blue-400 text-right'>Rs {item.price}</p>
        </div>
      ))}
    </div>
    <div className="flex justify-end items-center mt-5 border-t-1 border-color">
      <div className="mt-3" onClick={() => {
        navigate('/update-stock', { state: data })
      }}>
        <Button
          color="white"
          bgColor={currentColor}
          text="View All"
          borderRadius="10px"
        />
      </div>
    </div>
  </div>
}

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-24 md:mt-10">
      <div className="flex gap-10 flex-wrap justify-center items-stretch">
        <div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold text-center">WAREHOUSE</p>
              <p className="text-gray-400 text-center">Managment DashBoard</p>
            </div>
          </div>

          <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">WareHouse Components Distribution</p>

              <div>
                <p className="text-gray-200">Spare Parts Per WareHouse</p>
                <p className="text-gray-200">0 : North</p>
                <p className="text-gray-200">1 : South</p>
                <p className="text-gray-200">2 : East</p>
                <p className="text-gray-200">3 : West</p>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <SparkLine currentColor={currentColor} id="column-sparkLine" height="100px" type="Column" width="320" color="rgb(242, 252, 253)" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl w-350 md:w-780">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue BreakDown</p>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div id='css_width'>
              <Stacked currentMode={currentMode} height="360px" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <List />
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Sales Overview</p>
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
