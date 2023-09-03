import React, { useContext, useEffect, useState, useRef } from 'react'
import { io } from "socket.io-client";
import AuthContext from '../contexts/AuthContext'
import moment from 'moment'
import ServiceHelp from '../components/ServiceHelp';

import { useStateContext } from '../contexts/ContextProvider';
const socket = io("http://localhost:8081");

const itemData = [
    {
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
    },
    {
        iconBg: 'rgb(255, 244, 229)',
        iconColor: 'rgb(204,204,0)',
    },
    {
        iconColor: 'rgb(228, 106, 118)',
        iconBg: 'rgb(255, 244, 229)',
    },
    {
        iconColor: 'rgb(0, 194, 146)',
        iconBg: 'rgb(235, 250, 242)',
    },
];

const CustomerServiceAdmin = () => {
    const inputRef2 = useRef()
    const authCtx = useContext(AuthContext)
    const [connected, setIsConnected] = useState(false )
    const [chatId, setChatId] = useState(null)
    const [messages, setMessages] = useState([])
    const [queries, setQueries] = useState([])
    const { currentColor } = useStateContext();

    const messageHandler = () => {
        if (inputRef2.current.value === "")
            return

        const obj = { time: new Date(), role: authCtx.user.role, message: inputRef2.current.value, id: chatId }
        socket.emit("send-new-message", obj)
        inputRef2.current.value = ""
    }

    useEffect(() => {
        socket.on("connect", (arg) => {
            console.log(arg);
        });
    }, [])

    useEffect(() => {
        socket.on("online", (e) => {
            setQueries((prev) => [...prev, e])
        })

        socket.on("not-online", (e) => {
            var temp = queries.filter((q) => q._id !== e._id)
            setQueries(temp)
        })


        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data])
        });

        socket.on("live-users", (rooms) => {
            setQueries(rooms)
        })

        return () => {
            socket.off("online")
            socket.off("not-online")
            socket.off("message")
            socket.off("live-users")
        }
    })

    useEffect(() => {
        socket.emit("find-rooms");
        return () => {
            socket.off("find-rooms")
        }
    }, [connected])



    return (
        <div className="mt-24 md:mt-10">
            <div className="flex gap-1 flex-wrap justify-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780 ">
                    <div className="flex justify-center">
                        <p className="font-semibold text-xl text-center">Customer Service Admin</p>
                    </div>
                </div>
            </div>
            {connected === false && <div className="flex flex-col align-center flex-wrap lg:flex-nowrap justify-center ">
                {queries.length === 0 ? <p className="flex flex-col text-center gap-1 items-stretch dark:text-gray-200 p-4 pt-9 rounded-2xl ">No Clients Online Now</p> : <p className="flex flex-col gap-1 items-stretch dark:text-gray-200 p-4 pt-9 rounded-2xl text-center ">List Of Online Clients</p>}
                <div className="flex m-3 flex-wrap justify-center gap-1 items-center gap-3">
                    {queries.map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-1 items-stretch bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 rounded-2xl ">
                            <button
                                type="button"
                                style={{ color: itemData[idx % 4].iconColor, backgroundColor: itemData[idx % 4].iconBg }}
                                className="text-2xl opacity-0.9 rounded w-full p-4 hover:drop-shadow-xl"
                            >
                                USERNAME <br></br>{item.username}
                            </button>
                            <div className="mt-3">
                                <div className="text-lg font-semibold">{item.email}</div>
                                <div className={`text-sm `}>
                                    {item.fullName}
                                </div>
                            </div>
                            <button style={{ backgroundColor: currentColor }} className="flex items-center justify-center h-10 text-center text-white rounded px-3 text-sm" onClick={() => {
                                socket.emit("join-room", { id: item._id, role: authCtx.user.role })
                                setChatId(item._id)
                                setIsConnected(true)
                            }}>
                                Connect To User
                            </button>
                        </div>
                    ))}
                </div>
            </div>}

            {connected === true && <div className='flex gap-3 justify-center flex-col md:flex-row m-3 md:m-10'>

                <div className="flex flex-col md:w-1/2 bg-white dark:bg-secondary-dark-bg  shadow-xl rounded-lg overflow-hidden">
                    <div className="flex justify-end bg-gray-300 p-4">
                        {connected === true && <button className="flex items-center h-10 text-white bg-blue-600 rounded px-3 text-sm" onClick={() => {
                            socket.emit("server-room-closed", { id: chatId });
                            setIsConnected(false)
                            setMessages([])
                            setQueries([])
                            setChatId(null)
                        }}>
                            End Chat
                        </button>}
                    </div>

                    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto" style={{ height: '70vh' }}>
                        {messages.map((item, idx) => {
                            if (item.role === "admin")
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

                    <div className="flex gap-1 bg-gray-300 p-4">
                        <input className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" ref={inputRef2} />
                        <button className='rounded p-3 text-white h-10 text-sm' style={{ backgroundColor: currentColor }} onClick={messageHandler}>SEND</button>
                    </div>
                </div>
                <div className="flex flex-col md:w-1/2 shadow-xl rounded-lg">
                    <ServiceHelp />
                </div>
            </div>}
        </div>
    )
}

export default CustomerServiceAdmin