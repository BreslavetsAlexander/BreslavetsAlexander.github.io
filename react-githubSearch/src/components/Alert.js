import React, { useContext } from 'react';
import { appContext } from '../context/AppContext';

export function Alert() {
    const { alert, hideAlert } = useContext(appContext);
    if (!alert) {
        return null;
    }
    return (
        <div className="alert alert-danger">
            Type username
            <button type="button" className="close" onClick={() => hideAlert()}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}
