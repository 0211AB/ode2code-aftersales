import React from 'react';
import { BsFillCameraFill, BsFillPhoneLandscapeFill } from 'react-icons/bs';
import { FaWeightScale } from 'react-icons/fa6';
import { SiXiaomi } from 'react-icons/si'
import { MdSdStorage } from 'react-icons/md';
import { GrSystem } from 'react-icons/gr'

import { Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate()

    const mobileData = [
        {
            icon: <BsFillCameraFill />,
            amount: state.camera,
            title: 'Camera',
            iconColor: '#03C9D7',
            iconBg: '#E5FAFB',
            pcColor: 'red-600',
        },
        {
            icon: <BsFillPhoneLandscapeFill />,
            amount: state.display.size,
            title: 'Display',
            iconBg: 'rgb(255, 244, 229)',
            iconColor: 'rgb(204,204,0)',
            pcColor: 'green-600',
        },
        {
            icon: <MdSdStorage />,
            amount: state.storage,
            title: 'Storage',
            iconColor: 'rgb(228, 106, 118)',
            iconBg: 'rgb(255, 244, 229)',
            pcColor: 'green-600',
        },
        {
            icon: <FaWeightScale />,
            amount: state.weight,
            title: 'Weight',
            iconColor: 'rgb(0, 194, 146)',
            iconBg: 'rgb(235, 250, 242)',
            pcColor: 'red-600',
        },
    ];

    const { currentColor } = useStateContext();

    return (
        <div className="mt-24 md:mt-10">
            <div className="flex flex-wrap lg:flex-nowrap justify-center ">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-gray-400">Mobile Phone Details</p>
                            <p className="text-2xl text-gray-800">REDMI </p>
                        </div>
                        <button
                            type="button"
                            style={{ backgroundColor: currentColor }}
                            className="text-2xl opacity-0.9 text-white hover:  rounded-full  p-4"
                        >
                            <SiXiaomi />
                        </button>
                    </div>
                    <div className="mt-6">
                        <Button
                            color="white"
                            bgColor={currentColor}
                            text={`SKUID ` + state.skuId}
                            borderRadius="10px"
                        />
                    </div>
                </div>

                <div className="flex m-3 flex-wrap justify-center gap-1 items-stretch">
                    {mobileData.map((item) => (
                        <div key={item.title} className="bg-white w-5/12 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl ">
                            <button
                                type="button"
                                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                            >
                                {item.icon}
                            </button>
                            <p className="mt-3">
                                <span className="text-lg font-semibold">{item.amount}</span>
                                <span className={`text-sm text-${item.pcColor} ml-2`}>
                                    {item.percentage}
                                </span>
                            </p>
                            <p className="text-sm text-gray-400  mt-1">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-10 flex-wrap justify-center">
                <div className="bg-white w-full dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
                    <div className="flex flex-col justify-center">
                        <p className="font-bold text-xl text-center">{state.name}</p>
                        <p className="font-semibold text-xl text-center">{state.description}</p>
                    </div>
                    <div className="flex justify-center gap-4 mt-10 md:flex-row">
                        <img
                            className="md:w-36"
                            src={state.image}
                            alt={state.skuId}
                        />
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div
                        className=" rounded-2xl w-5/6 md:w-400 p-4 m-3"
                        style={{ backgroundColor: currentColor }}
                    >
                        <div className="flex flex-col justify-between">
                            <div className="mt-4 flex items-center gap-4">
                                <button
                                    type="button"
                                    style={{ color: 'white', backgroundColor: 'white' }}
                                    className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                                >
                                    <GrSystem />
                                </button>
                                <p className="font-semibold text-white text-2xl align-middle">System Specifications</p>
                            </div>

                            <div>
                                <p className="text-xl text-white font-semibold mt-8">{state.ram}</p>
                                <p className="text-gray-200">{state.os}</p>
                            </div>
                        </div>


                    </div>

                    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl w-5/6 md:w-400 p-8 m-3 flex justify-center items-center gap-10 flex-col">
                        <div>
                            <p className="text-2xl font-semibold text-center">{state.spareParts.length}</p>
                            <p className="text-gray-400">Spare Parts</p>
                        </div>

                        <div className="w-full flex justify-center" onClick={() => { navigate('/product/spare', { state }) }}>
                            <Button
                                color="white"
                                bgColor={currentColor}
                                text={'Search Spare Parts'}
                                borderRadius="10px"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetails