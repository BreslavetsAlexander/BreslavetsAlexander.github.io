import React, { Fragment, useContext } from 'react';
import { Search } from '../components/Seacrh';
import { Users } from '../components/Users';
import { Loader } from '../components/Loader';
import { appContext } from '../context/AppContext';

export function Home() {
    const { loading } = useContext(appContext);
    return (
        <Fragment>
            <Search />
            {loading ? <Loader /> : <Users />}
        </Fragment>
    );
}
