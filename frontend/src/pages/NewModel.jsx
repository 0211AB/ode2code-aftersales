import React, { useContext, useEffect, useState } from 'react'
import CloudinaryWidget from '../components/CloudinaryWidget'
import AuthContext from '../contexts/AuthContext'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { formToJSON } from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const animatedComponents = makeAnimated();


const NewModel = () => {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState(null)
  const authCtx = useContext(AuthContext)
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}products/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${authCtx.token}`
        },
        body: JSON.stringify(formData)
      });

      const res_data = await res.json();

      if (res.status === 200)
        toast.success(res_data.message)
      else
        toast.error(res_data.message)
    };

    if (formData !== null)
      getData();
    // eslint-disable-next-line
  }, [formData])

  const submitHandler = (e) => {
    e.preventDefault()
    if (document
      .getElementById("uploadedimage")
      .getAttribute("src") === null) {
      toast.warning('Image Is Required')
      return
    }

    setFormData({
      ...formToJSON(new FormData(document.getElementById('new-model-form'))),
      image: document.getElementById("uploadedimage").getAttribute("src"),
      compatible: selected
    })
  }

  console.log(formData)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}spare/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${authCtx.token}`
        },
      });

      const res_data = await res.json();

      if (res.status === 200)
        setData(res_data.map((item) => {
          return { value: item._id, label: item.sku + " " + item.name.substring(0, 20) }
        }))
    };

    if (data.length === 0)
      getData();
    // eslint-disable-next-line
  }, [])

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
  };

  return (
    <div className="mt-24 md:mt-10">
      <ToastContainer autoClose={1000} theme='colored' />
      <div className="flex gap-1 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780 ">
          <div className="flex justify-center">
            <p className="font-semibold text-xl text-center">Add New Mobile Phone Model</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 flex-wrap justify-center">
        <div className="flex justify-center bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl w-full md:w-780 ">
          <form id='new-model-form' className='w-full' onSubmit={submitHandler}>
            <div className="space-y-12">

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-500">
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="skuId" className="block text-sm font-medium leading-6 text-gray-500">
                      SKU ID
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="skuId"
                        id="skuId"
                        required
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-500">
                      Compatible Spare Parts
                    </label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      onChange={handleChange}
                      options={data}
                    />
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-500">
                      Description
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="description"
                        id="description"
                        required
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="dimensions" className="block text-sm font-medium leading-6 text-gray-500">
                      Display (Dimensions)
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="dimensions"
                        id="dimensions"
                        required
                        className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="size" className="block text-sm font-medium leading-6 text-gray-500">
                      Display (Size)
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="size"
                        id="size"
                        required
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-500">
                      Image
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-100 px-6 py-10">
                      <div className="text-center">
                        <div className="mt-4 flex text-sm leading-6 text-gray-300">
                          <CloudinaryWidget />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="camera" className="block text-sm font-medium leading-6 text-gray-500">
                      Camera
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="camera"
                        id="camera"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="os" className="block text-sm font-medium leading-6 text-gray-500">
                      Operating System
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="os"
                        id="os"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="ram" className="block text-sm font-medium leading-6 text-gray-500">
                      Ram
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="ram"
                        id="ram"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-500">
                      Weight
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="weight"
                        id="weight"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="storage" className="block text-sm font-medium leading-6 text-gray-500">
                      Storage
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="storage"
                        id="storage"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <input type="reset" className="text-sm font-semibold leading-6 text-gray-500 cursor-pointer" />
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div >
    </div >
  )
}

export default NewModel