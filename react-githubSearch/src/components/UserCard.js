import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../context/AppContext';

export function UserCard({ user }) {
    const { getUser } = useContext(appContext);
    return (
        <div className="card">
            <img
                src={user.avatar_url}
                className="card-img-top"
                alt={user.login}
            />
            <div className="card-body">
                <h5 className="card-title">{user.login}</h5>
                <Link
                    onClick={() => getUser(user.login)}
                    to={'/profile/' + user.login}
                    className="btn btn-primary">
                    Open profile
                </Link>
            </div>
        </div>
    );
}
