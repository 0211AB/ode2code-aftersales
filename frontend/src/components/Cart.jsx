import React, { useState, useEffect, useContext } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import Loader from './Loader'
import { ToastContainer, toast } from 'react-toastify';

import p1 from '../data/p1.svg'
import p2 from '../data/p2.svg'
import p3 from '../data/p3.svg'
import p4 from '../data/p4.svg'
import p5 from '../data/p5.svg'
import p6 from '../data/p6.svg'
import p7 from '../data/p7.svg'
import p8 from '../data/p8.svg'
import p9 from '../data/p9.svg'
import p10 from '../data/p10.svg'

import { useStateContext } from '../contexts/ContextProvider';
import { Button } from '.';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { currentColor, cart, setCart,handleClick } = useStateContext();
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false)
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const addRequest = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}request/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${token}`,
        },
        body: JSON.stringify({ price: total, parts: cart.map((c) => c._id) })
      });

      const res_data = await res.json()

      if (res.status === 201) 
          handleClick()
      else {
        toast({
          title: 'Error Creating Request.',
          description: res_data.message?.split("\"")[1],
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }

      setCart([])
      setLoading(false)
      navigate('previous-orders')
    }

    if (loading)
      addRequest()

    // eslint-disable-next-line
  }, [loading])


  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price.split(",").join("")), 0));
  }, [cart]);

  const p = [
    { name: "Back Housing", description: "The outer casing that provides protection and aesthetics to the device, often prone to damage from drops and impacts.", image: p1 },
    { name: "Battery", description: "The power source of the device, essential for keeping your gadget up and running. A worn-out battery can lead to reduced performance.", image: p2 },
    { name: "Charger", description: "The device that replenishes your gadget's battery. A faulty charger can lead to slow charging or even damage your device.", image: p3 },
    { name: "Data Cable", description: "Connects your device to other devices for data transfer and charging. A high-quality cable ensures efficient connectivity.", image: p4 },
    { name: "LCD Module", description: "The display unit that shows visuals and information. Cracked or malfunctioning LCDs can result in distorted or no visuals.", image: p5 },
    { name: "LCM", description: "The heart of your screen, responsible for generating images. A malfunctioning LCM can cause pixel issues and visual glitches.", image: p6 },
    { name: "Mainboard", description: "The central circuit board containing crucial components like the processor. A damaged mainboard can render the device inoperable.", image: p7 },
    { name: "PCB", description: "A complex board that interconnects various electronic components. Faulty PCBs can lead to issues in the device's functionality.", image: p9 },
    { name: "Sideboard", description: "A secondary circuit board that complements the mainboard. Issues with the sideboard can lead to specific component malfunctions.", image: p8 },
    { name: "Speaker", description: "Produces sound output for your device. A damaged speaker can result in distorted or no sound, affecting your device's multimedia experience.", image: p10 },
  ];


  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 ">
      <ToastContainer autoClose={1000} theme='colored' />

      <div className="float-right h-screen  duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Cart</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>

        {cart.length === 0 && <p className="m-t-3 m-b-3 text-red-300 text-center dark:text-red-300">No Items Added In Cart</p>}


        {cart?.map((item, index) => (

          <div key={index}>
            <div>
              <div className="flex items-center   leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
                <img className="rounded-lg h-80 w-24" src={p.filter((x) => x.name === item.type)[0].image} alt="" />
                <div className='w-2/3'>
                  <p className="font-semibold ">{item.name.substring(0, 20)}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{item.type}</p>
                  <div className="flex gap-4 mt-2 items-center">
                    <p className="font-semibold text-lg">Rs {item.price}</p>
                  </div>
                  <button
                    style={{ backgroundColor: 'rgb(239 68 68)', color: 'white', borderRadius: '10px' }}
                    className={`text-sm p-1 w-2/3 hover:drop-shadow-xl`}
                    onClick={() => setCart(cart.filter((c) => c._id !== item._id))}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-3 mb-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
            <p className="font-semibold">Rs {total}</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-500 dark:text-gray-200">Total</p>
            <p className="font-semibold">Rs {total}</p>
          </div>
        </div>
        <div className="mt-5">
          {cart.length > 0 && <button
            type="button"
            onClick={() => { setLoading(true) }}
            style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
            className={`p-3 w-full hover:drop-shadow-xl`}
          >
            {loading ? <Loader small={true} /> : 'Place Order'}
          </button>}
        </div>
      </div>
    </div>
  );
};

export default Cart;
