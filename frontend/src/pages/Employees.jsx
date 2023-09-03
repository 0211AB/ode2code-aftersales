import React, { useContext, useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';

import { Header } from '../components';
import AuthContext from '../contexts/AuthContext';

import { ToastContainer, toast } from 'react-toastify';

const Employees = () => {
  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: false, allowEditing: false };
  const [data, setData] = useState([])
  const [update, setUpdate] = useState(null)
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}user/update-role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${authCtx.token}`
        },
        body: JSON.stringify(update)
      });

      const res_data = await res.json();
      if (res.status === 200)
        toast.success(res_data.message)
      else
        toast.error(res_data.message)
    };

    if (update !== null)
      getData();

    // eslint-disable-next-line
  }, [update]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}user/admin-list`, {
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

  function updateRoleTemplate(props) {
    return <form className="mt-2" onSubmit={(ex) => {
      ex.preventDefault()
      setUpdate({ email: props.email, role: ex.target.elements[0].value })
    }}>
      <select
        required
        id="role"
        name="role"
        className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        defaultValue={props.role}
      >
        <option value='admin'>admin</option>
        <option value='warehouse'>warehouse</option>
        <option value='service-center'>service-center</option>
        <option value='customer-support'>customer-support</option>
      </select>
      <button
        type="submit"
        className="mt-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Update Role
      </button>
    </form>
  }


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gry-500 rounded-3xl">
      <ToastContainer autoClose={1000} theme='colored' />
      <Header category="Page" title="Employees" />
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
          <ColumnDirective field='email' headerText='Email' width='150' textAlign='Center' />
          <ColumnDirective field='profilePicture' headerText='Image' width='100' template={imageTemplate} textAlign='Center' />
          <ColumnDirective field='fullName' headerText='Employee Name' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
          <ColumnDirective field='username' headerText='Employee UserName' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
          <ColumnDirective field='role' headerText='Employee Role' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
          {authCtx.user?.role === 'admin' && <ColumnDirective headerText='Update Role' width='150' textAlign='Center' template={updateRoleTemplate} />}
        </ColumnsDirective>
        <Inject services={[Toolbar, Search, Page]} />

      </GridComponent>
    </div>
  );
};
export default Employees;