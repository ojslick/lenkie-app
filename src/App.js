import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './views/Home';
import { Artist } from './views/Artist';

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/artist/:artistId" element={<Artist />} />
            </Routes>
        </Router>
    );
}
