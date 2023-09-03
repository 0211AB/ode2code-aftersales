import React, { useContext, useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page,Toolbar } from '@syncfusion/ej2-react-grids';

import { Header } from '../components';
import AuthContext from '../contexts/AuthContext';

import { ToastContainer, toast } from 'react-toastify';

const Employees = () => {
  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([])
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}user/user-list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${authCtx.token}`
        }
      });

      const res_data = await res.json();
      if (res.status === 200)
        setData(res_data)
      else
        toast.error('Error Fetching Data. Please try again later')
    };

    if (data !== null)
      getData();

    // eslint-disable-next-line
  }, []);

  function imageTemplate(props) {
    return (<div className="Mapimage">
      <img src={props.profilePicture} alt={props.username} className="e-image" /> <span>  </span>
    </div>);
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gry-500 rounded-3xl">
      <ToastContainer autoClose={1000} theme='colored' />
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={data}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          <ColumnDirective field='email' headerText='Email' width='150' textAlign='Center'/>
          <ColumnDirective field='profilePicture' headerText='Image' width='100' template={imageTemplate} textAlign='Center'/>
          <ColumnDirective field='fullName' headerText='Name' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
          <ColumnDirective field='username' headerText='UserName' width='150' clipMode='EllipsisWithTooltip' textAlign='Center'/>
        </ColumnsDirective>
        <Inject services={[Toolbar,Search, Page]} />

      </GridComponent>
    </div>
  );
};
export default Employees;