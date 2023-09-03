import React, { useContext, useState, useEffect } from 'react';
import { SparklineComponent, Inject, SparklineTooltip } from '@syncfusion/ej2-react-charts';
import AuthContext from '../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify'

import Loader from '../../components/Loader';


const SparkLine = ({ id, height, width, color, type, currentColor }) => {
  const authCtx = useContext(AuthContext)
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}spare/location`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${authCtx.token}`
        }
      });

      const res_data = await res.json();
      if (res.status === 200) {
        let entries = Object.entries(res_data)
        setData(entries.map(([key, val], idx) => {
          return { x: idx, xval: key, yval: Number(val) };
        }))
      }
      else
        toast.error(res_data.message)
    };

    if (data.length === 0)
      getData();

    // eslint-disable-next-line
  }, []);

  if (data.length === 0)
    return <Loader />

  return (
    <>
      <ToastContainer autoClose={1000} theme='colored' />
      <SparklineComponent
        id={id}
        height={height}
        width={width}
        lineWidth={1}
        // valueType="Numeric"
        fill={color}
        border={{ color: currentColor, width: 2 }}
        tooltipSettings={{
          visible: true,
          // eslint-disable-next-line no-template-curly-in-string
          format: '${x} : ${yval} components',
        }}
        dataSource={data}
        xName="x"
        yName="yval"
        type={type}
      >
        <Inject services={[SparklineTooltip]} />
      </SparklineComponent></>
  );
}

export default SparkLine;
