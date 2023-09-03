import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Sidebar } from "./components";
import {
  Ecommerce,
  Orders,
  Employees,
  Customers,
  Products
} from "./pages";

import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import ProductDetails from "./pages/ProductDetails";
import AllProducts from "./pages/AllProducts";
import SpareParts from "./pages/SpareParts";
import SparePartDetail from './pages/SparePartDetail'
import AuthContext from "./contexts/AuthContext";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SparePartProduct from "./pages/SparePartProduct";
import UserRequests from "./pages/UserRequests";
import RequestPickup from "./pages/RequestPickup";
import CustomerService from "./pages/CustomerService";
import CustomerServiceAdmin from "./pages/CustomerServicesAdmin";
import Notifications from "./pages/Notifications";
import UpdateStock from "./pages/UpdateStock";
import NewModel from "./pages/NewModel";
import NewSparePart from "./pages/NewSparePart";
import ListRepairs from "./pages/ListRepairs";
import ListProducts from "./pages/ListProducts";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    setThemeSettings,
  } = useStateContext();

  const authCtx = useContext(AuthContext)

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {authCtx.isLoggedIn && <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>}
          {activeMenu ? (
            <div className={`${authCtx.isLoggedIn ? 'w-72' : 'w-0'} fixed sidebar dark:bg-secondary-dark-bg bg-white1`}>
              <Sidebar />
            </div>
          ) : authCtx.isLoggedIn && (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? `dark:bg-main-dark-bg  bg-main-bg min-h-screen ${authCtx.isLoggedIn ? 'md:ml-72' : 'md:ml-0'} w-full  `
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {authCtx.isLoggedIn && <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>}
            <div>
              <Routes>
                {/* dashboard  */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={authCtx.isLoggedIn ? <Navigate to="/products" /> : <Navigate to="/signin" />} />
                <Route path="/warehouse" element={authCtx.isLoggedIn ? <Ecommerce /> : <Navigate to="/signin" />} />
                <Route path="/products" element={authCtx.isLoggedIn ? <Products /> : <Navigate to="/signin" />} />
                <Route path="/spare-parts" element={authCtx.isLoggedIn ? <SpareParts /> : <Navigate to="/signin" />} />
                <Route path="/update-stock" element={authCtx.isLoggedIn ? <UpdateStock /> : <Navigate to="/signin" />} />
                <Route path="/new-model" element={authCtx.isLoggedIn ? <NewModel /> : <Navigate to="/signin" />} />
                <Route path="/new-parts" element={authCtx.isLoggedIn ? <NewSparePart /> : <Navigate to="/signin" />} />

                {/* pages  */}

                <Route path="/previous-orders" element={authCtx.isLoggedIn ? <UserRequests /> : <Navigate to="/signin" />} />
                <Route path="/request-pickup" element={authCtx.isLoggedIn ? <RequestPickup /> : <Navigate to="/signin" />} />
                <Route path="/orders" element={authCtx.isLoggedIn ? <Orders /> : <Navigate to="/signin" />} />
                <Route path="/customer-service/admin" element={authCtx.isLoggedIn ? authCtx.user?.role !== 'user' ? <CustomerServiceAdmin /> : <></> : <Navigate to="/signin" />} />
                <Route path="/customer-service" element={authCtx.isLoggedIn ? <CustomerService /> : <Navigate to="/signin" />} />
                <Route path="/employees" element={authCtx.isLoggedIn ? <Employees /> : <Navigate to="/signin" />} />
                <Route path="/customers" element={authCtx.isLoggedIn ? <Customers /> : <Navigate to="/signin" />} />
                <Route path="/notifications" element={authCtx.isLoggedIn ? <Notifications /> : <Navigate to="/signin" />} />

                <Route path="/list-products" element={authCtx.isLoggedIn ? <ListProducts /> : <Navigate to="/signin" />} />
                <Route path="/list-repairs" element={authCtx.isLoggedIn ? <ListRepairs /> : <Navigate to="/signin" />} />



                <Route path="/product/details" element={authCtx.isLoggedIn ? <ProductDetails /> : <Navigate to="/signin" />} />
                <Route path="/product/all" element={authCtx.isLoggedIn ? <AllProducts /> : <Navigate to="/signin" />} />
                <Route path="/spare/details" element={authCtx.isLoggedIn ? <SparePartDetail /> : <Navigate to="/signin" />} />
                <Route path="/product/spare" element={authCtx.isLoggedIn ? <SparePartProduct /> : <Navigate to="/signin" />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
