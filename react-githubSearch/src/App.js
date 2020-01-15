import React from 'react';
import { Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Profile } from './pages/Profile';
import { AppContext } from './context/AppContext';
import { Alert } from './components/Alert';

export function App() {
    return (
        <AppContext>
            <Navbar />
            <div className="container">
                <Alert />
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/profile/:name" exact component={Profile} />
            </div>
        </AppContext>
    );
}
