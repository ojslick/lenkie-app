import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { Home } from './views/Home/Home';
import { Artist } from './views/Artist/Artist';

export function Routes() {
    return (
        <RouterRoutes>
            <Route path="/" index element={<Home />} />
            <Route path="/artist/:artistId" element={<Artist />} />
        </RouterRoutes>
    );
}
