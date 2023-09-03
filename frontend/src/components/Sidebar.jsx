import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../contexts/ContextProvider';
import { RiCustomerService2Line } from 'react-icons/ri';
import { CiBoxList } from 'react-icons/ci'
import { DiAptana } from 'react-icons/di'
import { FaTruckFast, FaWarehouse, FaClipboardList } from 'react-icons/fa6'
import { GoListOrdered } from 'react-icons/go'
import { FaUsers, FaUserShield } from 'react-icons/fa'
import { MdNotifications, MdRestore } from 'react-icons/md'
import { TbDeviceMobilePlus, TbDeviceMobileCog } from 'react-icons/tb'
import AuthContext from '../contexts/AuthContext'

const userLinks = [
  {
    title: 'DashBoard',
    links: [
      {
        name: 'previous-orders',
        icon: <GoListOrdered />,
      },
      {
        name: 'request-pickup',
        icon: <FaTruckFast />,
      },
      {
        name: 'customer-service',
        icon: <RiCustomerService2Line />,
      },
    ],
  }]

const adminLinks = [{
  title: 'Users',
  links: [
    {
      name: 'customers',
      text: 'User List',
      icon: <FaUsers />,
    },
    {
      name: 'employees',
      text: 'Employee List',
      icon: <FaUserShield />,
    },
  ],
}, {
  title: 'Add Products',
  links: [
    {
      name: 'new-model',
      text: 'New Models',
      icon: <TbDeviceMobilePlus />,
    },
    {
      name: 'new-parts',
      text: 'New Spare Parts',
      icon: <FaUserShield />,
    },
  ],
}, {
  title: 'Manage Services',
  links: [
    {
      name: 'list-products',
      text: 'Part Requests List',
      icon: <TbDeviceMobileCog />,
    },
    {
      name: 'list-repairs',
      text: 'Repair Order List',
      icon: <FaClipboardList />,
    },
  ],
}, {
  title: 'Customer Care DashBoard',
  links: [
    {
      name: 'customer-service/admin',
      text: 'Customer Service',
      icon: <RiCustomerService2Line />,
    }
  ],
}]

const wareHouseLinks = [{
  title: 'Dashboard',
  links: [
    {
      name: 'warehouse',
      text: 'WareHouse Planning',
      icon: <FaWarehouse />,
    }, {
      name: 'update-stock',
      text: 'Update Stock',
      icon: <MdRestore />,
    }
  ],
}, {
  title: 'NOTIFICATIONS',
  links: [
    {
      name: 'notifications',
      text: 'Update Notifications',
      icon: <MdNotifications />,
    }
  ],
}]

const csLinks = [{
  title: 'DashBoard',
  links: [
    {
      name: 'customer-service/admin',
      text: 'Customer Service',
      icon: <RiCustomerService2Line />,
    }
  ],
}]

const scLinks = [{
  title: 'Add Products',
  links: [
    {
      name: 'new-model',
      text: 'New Models',
      icon: <TbDeviceMobilePlus />,
    },
    {
      name: 'new-parts',
      text: 'New Spare Parts',
      icon: <FaUserShield />,
    },
  ],
}, {
  title: 'Manage Services',
  links: [
    {
      name: 'list-products',
      text: 'Part Requests List',
      icon: <TbDeviceMobileCog />,
    },
    {
      name: 'list-repairs',
      text: 'Repair Order List',
      icon: <FaClipboardList />,
    },
  ],
}]


const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const authCtx = useContext(AuthContext)

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span>mobiFix</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            <div>
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                PRODUCTS
              </p>
              <NavLink
                to={`/products`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <CiBoxList />
                <span className="capitalize ">Mobile Phones</span>
              </NavLink>
              <NavLink
                to={`/spare-parts`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <DiAptana />
                <span className="capitalize ">Spare Parts</span>
              </NavLink>
            </div>

            {authCtx.user?.role === 'user' && userLinks.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name === 'products' ? 'Mobile Phones' : link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}

            {authCtx.user?.role === 'admin' && adminLinks.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.text}</span>
                  </NavLink>
                ))}
              </div>
            ))}

            {authCtx.user?.role === 'service-center' && scLinks.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.text}</span>
                  </NavLink>
                ))}
              </div>
            ))}

            {authCtx.user?.role === 'warehouse' && wareHouseLinks.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.text}</span>
                  </NavLink>
                ))}
              </div>
            ))}

            {authCtx.user?.role === 'customer-support' && csLinks.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.text}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
