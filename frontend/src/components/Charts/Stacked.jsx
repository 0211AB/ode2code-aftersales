import React, { useContext, useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../contexts/ContextProvider';
import AuthContext from '../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify'


const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
};

const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 0,
  maximum: 10000,
  interval: 1000,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};

const Stacked = ({ height }) => {
  const { currentMode } = useStateContext();
  const authCtx = useContext(AuthContext)
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}request/revenue`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${authCtx.token}`
        }
      });

      const res_data = await res.json();
      if (res.status === 200) {
        let entries = Object.entries(res_data)
        setData(entries.map(([key, val]) => {
          return { x: key === 'sum' ? 'Total' : key, y: val };
        }))
      }
      else
        toast.error(res_data.message)
    };

    if (data.length === 0)
      getData();

    // eslint-disable-next-line
  }, []);

  const stackedCustomSeries = [
    {
      dataSource: data,
      xName: 'x',
      yName: 'y',
      type: 'StackingColumn',
    }
  ];


  return (
    <ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width='100%'
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <ToastContainer autoClose={1000} theme='colored' />
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {stackedCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;
