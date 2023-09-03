import React, { useContext } from 'react';

import { useStateContext } from '../contexts/ContextProvider';
import AuthContext from '../contexts/AuthContext';

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, cartButton, cartProd, logout }) => {
  const { setIsClicked, initialState, cart, setCart } = useStateContext();
  const authCtx = useContext(AuthContext)

  return (
    <button
      type="button"
      onClick={() => {
        if (cartButton)
          setCart([...cart, cartProd])
        if (logout)
          authCtx.logout()
        setIsClicked(initialState)
      }}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
