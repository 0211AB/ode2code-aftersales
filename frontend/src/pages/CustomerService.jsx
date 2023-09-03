import React, { useContext, useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client";
import AuthContext from '../contexts/AuthContext'
import { useStateContext } from '../contexts/ContextProvider';
import moment from 'moment'
const socket = io("http://localhost:8081");

const CustomerService = () => {
    const authCtx = useContext(AuthContext)
    const inputRef = useRef()
    const { currentColor } = useStateContext()
    const [messages, setMessages] = useState([])
    const [isConnected, setIsConnected] = useState(null)

    const messageHandler = () => {
        if (inputRef.current.value === "")
            return

        const obj = { time: new Date(), role: authCtx.user.role, message: inputRef.current.value, id: authCtx.user._id }
        socket.emit("send-new-message", obj)
        inputRef.current.value = ""
    }

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);
        });
    }, [])


    useEffect(() => {
        socket.on("admin-joined", (e) => {
            setIsConnected(true)
        })

        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data])
        });

        socket.on("room-closed", () => {
            setMessages([])
            setIsConnected(null)
        })

        return () => {
            socket.off("message")
            socket.off("admin-joined")
            socket.off("room-closed")
        }
    })

    return (
        <div className="mt-24 md:mt-10">
            <div className="flex gap-1 flex-wrap justify-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780 ">
                    <div className="flex justify-center">
                        <p className="font-semibold text-xl text-center">Customer Service</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center m-3 md:m-10'>

                <div className="flex flex-col flex-grow w-5/6 bg-white dark:bg-secondary-dark-bg shadow-xl rounded-lg overflow-hidden">
                    <div className="flex justify-end bg-gray-300 p-4">
                        {isConnected === null && <button className="flex items-center h-10 text-white bg-blue-600 rounded px-3 text-sm" onClick={() => {
                            socket.emit("join-room", { id: authCtx.user._id, role: authCtx.user.role })
                            setIsConnected(false)
                        }}>
                            Connect To A Customer Care Executive
                        </button>}
                    </div>

                    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto" style={{ height: '70vh' }}>
                        {isConnected === false && <><div className="flex justify-center align-center w-full mt-2 ">

                            <p className="text-lg text-center text-gray-200">Please wait while you are connected to a customer care executive.</p>

                        </div><div className="loader"></div></>}
                        {isConnected === true && messages.map((item, idx) => {
                            if (item.role === "user")
                                return <div key={idx} className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                                    <div>
                                        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                            <p className="text-sm">{item.message}</p>
                                        </div>
                                        <span className="text-xs text-gray-500 leading-none">{moment(item.time).fromNow()}</span>
                                    </div>
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600"></div>
                                </div>
                            else
                                return <div key={idx} className="flex w-full mt-2 space-x-3 max-w-xs">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                                    <div>
                                        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                            <p className="text-sm text-gray-800">{item.message}</p>
                                        </div>
                                        <span className="text-xs text-gray-500 leading-none">{moment(item.time).fromNow()}</span>
                                    </div>
                                </div>

                        })}
                    </div>

                    {isConnected === true && <div className="flex gap-1 bg-gray-300 p-4">
                        <input className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" ref={inputRef} />
                        <button className='rounded p-3 text-white h-10 text-sm' style={{ backgroundColor: currentColor }} onClick={messageHandler}>SEND</button>
                    </div>}
                </div>
            </div>
        </div >
    )
}

export default CustomerService