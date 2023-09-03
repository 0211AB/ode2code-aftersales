import React, { useState, useCallback, useEffect } from "react";

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
});

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token");
    return {
        token: storedToken,
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();

    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);
    const [id, setId] = useState(null)
    const [user, setUser] = useState(null)

    const userIsLoggedIn = !!token;

    useEffect(() => {
        if (userIsLoggedIn && id === null) {
            const getData = async () => {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}user/details`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer : ${token}`
                    }
                });

                const res_data = await res.json()
                setId(res_data._id)
                setUser(res_data)
            }

            getData()
        }
        else
            return;
        // eslint-disable-next-line
    }, [id])

    const logoutHandler = useCallback(() => {
        setToken(null);
        setId(null)
        setUser(null)
        localStorage.removeItem("token");
    }, []);

    const loginHandler = (token, id, user) => {
        setUser(user)
        setToken(token);
        setId(id)
        localStorage.setItem("token", token);
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        id: id,
        user: user,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;