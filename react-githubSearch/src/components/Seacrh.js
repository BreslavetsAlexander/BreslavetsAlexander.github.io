import React, { useContext, useState } from 'react';
import { appContext } from '../context/AppContext';

export function Search() {
    const [value, setValue] = useState('');
    const { searchUsers, showAlert } = useContext(appContext);
    const onSearch = () => {
        if (value.trim().length) {
            searchUsers(value.trim());
        } else {
            showAlert();
        }
    };
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Type username"
                value={value}
                onChange={event => setValue(event.target.value)}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        onSearch();
                    }
                }}
            />
            <div className="input-group-append">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => onSearch()}>
                    Search
                </button>
            </div>
        </div>
    );
}
