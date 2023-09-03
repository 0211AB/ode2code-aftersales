import React, { useContext, useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { MdOutlineRestore } from 'react-icons/md'

const Notifications = () => {
    const { state } = useLocation()
    const [data, setData] = useState(state)
    const toolbarOptions = ['Search'];
    const editing = { allowDeleting: false, allowEditing: false };
    const [update, setUpdate] = useState(null)
    const authCtx = useContext(AuthContext)

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
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}notifications/update`, {
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
        return <form className="mt-2" onSubmit={(ex) => {
            ex.preventDefault()
            setUpdate({
                name: props.name,
                modelName: props.modelName,
                modelSkuId: props.modelSkuId
            })
        }}>
            <button
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
                <MdOutlineRestore />
            </button>
        </form>
    }


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gry-500 rounded-3xl">
            <ToastContainer autoClose={1000} theme='colored' />
            <Header category="Page" title="Notifications" />
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
                    <ColumnDirective field='modelName' headerText='Model Name' width='250' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    <ColumnDirective field='modelSkuId' headerText='Model SKU Id' width='150' clipMode='EllipsisWithTooltip' textAlign='Center' />
                    {authCtx.user?.role === 'warehouse' && <ColumnDirective headerText='Update Notification Status After Restock' width='150' textAlign='Center' template={updateStockTemplate} />}
                </ColumnsDirective>
                <Inject services={[Toolbar, Search, Page]} />

            </GridComponent>
        </div>
    );
};
export default Notifications;