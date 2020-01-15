import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { appContext } from '../context/AppContext';

export function Profile() {
    const { user, loading } = useContext(appContext);
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <Link to="/" className="btn btn-outline-primary">
                        &#8592; Back
                    </Link>
                    <div className="card p-3 mt-3">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img
                                    src={user.avatar_url}
                                    alt={user.name}
                                    className="card-img"
                                />
                                <a
                                    href={user.html_url}
                                    target="_blank"
                                    className="btn btn-block btn-primary mt-3">
                                    Open Github profile
                                </a>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h1 className="card-title">{user.name}</h1>
                                    {user.location ? (
                                        <p>
                                            Location:{' '}
                                            <strong>{user.location}</strong>
                                        </p>
                                    ) : null}
                                    {user.bio ? (
                                        <p>
                                            Bio: <strong>{user.bio}</strong>
                                        </p>
                                    ) : null}
                                    <p>
                                        Username:{' '}
                                        <strong>
                                            {user.login
                                                ? user.login
                                                : user.name}
                                        </strong>
                                    </p>
                                    {user.company ? (
                                        <p>
                                            Company:{' '}
                                            <strong>{user.company}</strong>
                                        </p>
                                    ) : null}
                                    {user.blog ? (
                                        <p>
                                            Website:{' '}
                                            <strong>{user.blog}</strong>
                                        </p>
                                    ) : null}
                                    <div className="badge badge-primary p-2 mr-1">
                                        Followers: {user.followers}
                                    </div>
                                    <div className="badge badge-primary p-2 mr-1">
                                        Following: {user.following}
                                    </div>
                                    <div className="badge badge-primary p-2 mr-1">
                                        Repos: {user.public_repos}
                                    </div>
                                    <div className="badge badge-primary p-2">
                                        Gists: {user.public_gists}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {user.repos.length ? (
                            <div className="mt-3">
                                <h3 className="h3">Repositories:</h3>
                                <div className="row mt-3">
                                    {user.repos.map(repo => (
                                        <div
                                            className="col-sm-3 mb-3"
                                            key={repo.id}>
                                            <a
                                                href={repo.html_url}
                                                target="_blank"
                                                className="list-group-item list-group-item-action list-group-item-primary text-center">
                                                {repo.name.length > 20
                                                    ? repo.name.slice(0, 20) +
                                                      '...'
                                                    : repo.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </Fragment>
            )}
        </div>
    );
}
