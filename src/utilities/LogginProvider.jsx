import { useState, createContext } from 'react';

import PropTypes from 'prop-types';

export const LoginSessionContext = createContext();

export function LoginSessionProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <LoginSessionContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </LoginSessionContext.Provider>
    );
}

LoginSessionProvider.propTypes = {
    children: PropTypes.node,
};
