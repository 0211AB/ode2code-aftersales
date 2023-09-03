import React, { useContext, useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const ListRepair = () => {
    const { state } = useLocation()
    const [data, setData] = useState(state)
    const toolbarOptions = ['Search'];
    const editing = { allowDeleting: false, allowEditing: false };
    const [update, setUpdate] = useState(null)
    const authCtx = useContext(AuthContext)

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}order/list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                }
            });

            const res_data = await res.json();
            console.log(res_data)

            if (res.status === 200)
                setData(res_data.map((item) => {
                    return { ...item, name: item.user.fullName, email: item.user.email, modelName: item.model.name, skuId: item.model.skuId }
                }))
            else
                toast.error(res_data.message)
        };

        if (data === null)
            getData();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}order/update`, {
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

    function updateStockTemplate(props) {
        return <button
            className="flex justify-center align-center g-1 rounded-md bg-green-600 px-3 py-2 w-full text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={() => { setUpdate({ id: props._id }) }}
        >
            Finish Repair
        </button>

    }

    console.log(data)

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gry-500 rounded-3xl">
            <ToastContainer autoClose={1000} theme='colored' />
            <Header category="Page" title="Repair Orders List" />
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
                    <ColumnDirective field='name' headerText='User Name' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='email' headerText='User Email' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='address' headerText='Address' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='createdDate' format='dd/MM/yyyy' headerText='Date Of Creation' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='modelName' headerText='Model Name' width='250' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='skuId' headerText='Model SKU Id' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective headerText='Update Repair Status' width='150' textAlign='Center' template={updateStockTemplate} />
                </ColumnsDirective>
                <Inject services={[Toolbar, Search, Page]} />

            </GridComponent>
        </div>
    );
};
export default ListRepair;