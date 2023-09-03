import React, { useContext, useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { formToJSON } from 'axios'

const UpdateStock = () => {
    const { state } = useLocation()
    const [data, setData] = useState(state)
    const toolbarOptions = ['Search'];
    const editing = { allowDeleting: false, allowEditing: false };
    const [update, setUpdate] = useState(null)
    const authCtx = useContext(AuthContext)

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}spare/quantity`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                }
            });

            const res_data = await res.json();

            if (res.status === 201)
                setData(res_data)
            else
                toast.error(res_data.message)
        };

        if (data === null)
            getData();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}spare/update`, {
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
        return <form className="mt-2" id='update-stock-form' onSubmit={(ex) => {
            ex.preventDefault()
            setUpdate({
                id: props._id,
                quantity: formToJSON(new FormData(document.getElementById('update-stock-form'))).quantity
            })
        }}>
            <div>
                <div className="mt-2">
                    <input
                        id="order"
                        name="quantity"
                        type="number"
                        required
                        placeholder='Updated Quantity'
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="mt-2 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
                Update
            </button>
        </form>
    }


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gry-500 rounded-3xl">
            <ToastContainer autoClose={1000} theme='colored' />
            <Header category="Page" title="UpdateStock" />
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
                    <ColumnDirective field='name' headerText='Model Name' width='250' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='sku' headerText='SKU' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='price' headerText='Current Price' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field="type" headerText='Part Type' width='150' textAlign='Center' />
                    <ColumnDirective field="quantity" headerText='Remaning' width='50' textAlign='Center' />
                    {authCtx.user?.role === 'warehouse' && <ColumnDirective headerText='Update Quantity' width='150' textAlign='Center' template={updateStockTemplate} />}
                </ColumnsDirective>
                <Inject services={[Toolbar, Search, Page]} />

            </GridComponent>
        </div>
    );
};
export default UpdateStock;