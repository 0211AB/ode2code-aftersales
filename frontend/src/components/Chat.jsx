import React, { useContext, useState, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import AuthContext from '../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const { currentColor } = useStateContext();
  const authCtx = useContext(AuthContext)
  const [chatData, setChatData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}notifications/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${authCtx.token}`
        }
      });

      const res_data = await res.json();

      if (res.status === 200)
        setChatData(res_data)
      else
        toast.error(res_data.message)
    };

    if (chatData === null)
      getData();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <ToastContainer autoClose={1000} theme='colored' />
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Notifications   </p>
          <button type="button" className="text-white  text-xs rounded p-1 px-2 bg-orange">
            {chatData?.length} New
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-5 ">
        {chatData?.slice(0, 3).map((item, index) => (
          <div key={index} className="flex items-center gap-5 border-b-1 border-color p-3 leading-8 cursor-pointer">
            <div>
              <p className="font-semibold dark:text-gray-200 ">NAME : {item.name}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">MODEL : {item.modelName}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">SKU : {item.modelSkuId}</p>
            </div>
          </div>
        ))}
        <div className="mt-5" onClick={() => { navigate('/notifications',{state:chatData}) }}>
          <Button
            color="white"
            bgColor={currentColor}
            text="See all messages"
            borderRadius="10px"
            width="full"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
