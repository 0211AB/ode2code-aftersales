import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const SpareParts = () => {
    const navigate = useNavigate()

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

    const renderProductCard = (product) => (
        <div key={product.name} className=" cursor-pointer w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3" onClick={() => { navigate('/spare/details', { state: product.name }) }}>
            <div className="flex justify-center flex-col">
                <p className="text-xl text-center font-semibold">{product.name}</p>
                <p className="text-md text-center">{product.description}</p>
            </div>
            <div className="flex justify-center gap-4 mt-10 md:flex-row">
                <img
                    className="w-24 md:w-36"
                    src={product.image}
                    alt={product.name}
                />
            </div>
        </div>
    );

    return (
        <div className="mt-24 md:mt-10">
            <div className="flex gap-1 flex-wrap justify-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780 ">
                    <div className="flex justify-center">
                        <p className="font-semibold text-xl text-center">Mobile Phone Spare Parts</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center">
                {p.map(renderProductCard)}
            </div>
        </div>
    )
}

export default SpareParts