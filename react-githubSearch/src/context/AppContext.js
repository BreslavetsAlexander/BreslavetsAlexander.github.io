import React, { createContext, useState } from 'react';
import { GithubService } from '../services/GithubService';

export const appContext = createContext();

export function AppContext({ children }) {
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const searchUsers = value => {
        setAlert(false);
        setLoading(true);
        GithubService.searchUsers(value).then(res => {
            setUsers(res);
            setLoading(false);
        });
    };
    const getUser = name => {
        setAlert(false);
        setLoading(true);
        GithubService.getUser(name).then(res => {
            setUser(res);
            setLoading(false);
        });
    };
    const showAlert = () => setAlert(true);
    const hideAlert = () => setAlert(false);
    return (
        <appContext.Provider
            value={{
                users,
                searchUsers,
                user,
                getUser,
                loading,
                alert,
                showAlert,
                hideAlert,
            }}>
            {children}
        </appContext.Provider>
    );
}
