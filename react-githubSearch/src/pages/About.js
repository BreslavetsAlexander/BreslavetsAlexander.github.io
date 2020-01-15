import React from 'react';

export function About() {
    return (
        <div className="jumbotron mt-3">
            <div className="container">
                <h1 className="display-4">Github Search React App</h1>
                <p className="lead">
                    Using this app, you can search users and information about
                    them from <a href="https://github.com/">Github.com</a>
                </p>
                <p className="lead">API: {'https://api.github.com'}</p>
                <p className="lead">
                    Author:{' '}
                    <a
                        href="https://github.com/BreslavetsAlexander"
                        target="_blank">
                        Breslavets Alexander
                    </a>
                </p>
            </div>
        </div>
    );
}
