import React, { useContext } from 'react';
import { UserCard } from '../components/UserCard';
import { appContext } from '../context/AppContext';

export function Users() {
    const { users } = useContext(appContext);
    if (!users) {
        return null;
    }
    return (
        <div className="row">
            {users.map(user => (
                <div className="col-sm-3 mb-3" key={user.id}>
                    <UserCard user={user} />
                </div>
            ))}
        </div>
    );
}
