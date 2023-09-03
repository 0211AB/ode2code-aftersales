import React, { useContext, useEffect, useState } from 'react';
import { MdSystemSecurityUpdateGood } from 'react-icons/md';
import { GiAutoRepair } from 'react-icons/gi';
import { formToJSON } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useStateContext } from '../contexts/ContextProvider';
import AuthContext from '../contexts/AuthContext';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const RequestPickup = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [models, setModels] = useState([])
  const [data, setData] = useState(null)
  const [history, setHistory] = useState([])
  const authCtx = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault();
    var req = formToJSON(new FormData(document.getElementById('request-form')))
    setData({
      model: req.model,
      address: req.address + "," + req.region + "," + req.city + "," + req.postalcode
    })
  }

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}user/pickup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${authCtx.token}`
        },
        body: JSON.stringify(data)
      });

      const res_data = await res.json();
      if (res.status === 201)
        toast.success(res_data.Message)
      else
        toast.error(res_data.Message)

      setData(null)

    };

    if (data !== null)
      getData();

    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}products/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res_data = await res.json();
      setModels(res_data)
    };

    const getHistory = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}order/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${authCtx.token}`
        },
      });

      const res_data = await res.json();
      setHistory(res_data)
    };

    if (models.length === 0) {
      getData();
      getHistory();
    }

    // eslint-disable-next-line
  }, []);



  return (
    <div className="flex gap-10 flex-wrap justify-center">
      <ToastContainer autoClose={1000} theme='colored' />
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
        <div className="flex justify-between">
          <p className="font-semibold text-xl">Request Pickup For Repair/Diagnosis</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2 text-red-400 hover:drop-shadow-xl">
              <span>
                <GiAutoRepair />
              </span>
              <span>Repair</span>
            </p>
            <p className="flex items-center gap-2 text-blue-400 hover:drop-shadow-xl">
              <span>
                <MdSystemSecurityUpdateGood />
              </span>
              <span>Diagnose</span>
            </p>
          </div>
        </div>
        <div className="mt-10 flex gap-10 flex-wrap justify-center">
          <form onSubmit={submitHandler} id='request-form'>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-400">Thank you for choosing our service. We look forward to assisting you</h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">We're excited to help you with your phone pickup! To ensure a smooth process, please provide us with the following details:</p>

                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-400">
                      Model
                    </label>
                    <div className="mt-2">
                      <select
                        disabled={models.length === 0}
                        required
                        id="country"
                        name="model"
                        autoComplete="country-name"
                        className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        {models.map((item) => {
                          return <option value={item._id} key={item._id}>{item.name}</option>
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-400">
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        type="text"
                        name="address"
                        id="street-address"
                        autoComplete="street-address"
                        className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block px-1.5 text-sm font-medium leading-6 text-gray-400">
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="region" className="block px-1.5 text-sm font-medium leading-6 text-gray-400">
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block px-1.5 text-sm font-medium leading-6 text-gray-400">
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="postalcode"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <input type="reset" className="text-sm font-semibold leading-6 text-gray-300 cursor-pointer" />
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div
          className=" rounded-2xl md:w-400 p-4 m-3"
          style={{ backgroundColor: currentColor }}
        >
          <div className="flex justify-center items-center ">
            <p className="font-semibold text-white text-2xl text-center">Repair Order History</p>
          </div>
        </div>

        {history.map((item, idx) => {
          return <div key={idx} className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-3 m-3 flex justify-center items-center gap-10">
            <div className='w-full'>
              <p className="text-xl font-semibold">Order {item._id}</p>
              <p className="text-lg font-semibold ">{moment(item.createdDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
              <p className="text-gray-400">{item.address}</p>
              <div className="flex gap-4 mt-4">
                <p
                  style={{ background: 'orange' }}
                  className="cursor-pointer hover:drop-shadow-xl text-gray-900 py-1.5 px-3 rounded-lg text-xs"
                >
                  SkuID : {item.model.skuId}
                </p>
                <p
                  style={{ background: '#FB9678' }}
                  className="cursor-pointer hover:drop-shadow-xl text-gray-900 py-1.5 px-3 rounded-lg text-xs"
                >
                  Model : {item.model?.name}
                </p>

                <p
                  style={{ background: item.completed ? 'green' : 'red' }}
                  className="cursor-pointer hover:drop-shadow-xl text-white py-1.5 px-3 rounded-lg text-xs"
                >
                  {item.completed ? 'COMPLETED' : 'ONGOING'}
                </p>
              </div>
              <div className="flex gap-4 mt-4">

                <button
                  style={{ background: currentColor }}
                  className="cursor-pointer hover:drop-shadow-xl text-white py-1.5 px-3 rounded-lg text-s"
                  onClick={() => { navigate('/customer-service') }}
                >
                  Contact Customer Care
                </button>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default RequestPickup