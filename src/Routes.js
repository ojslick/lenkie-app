import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { Home } from './views/Home';
import { Artist } from './views/Artist';

export function Routes() {
    return (
        <RouterRoutes>
            <Route path="/" index element={<Home />} />
            <Route path="/artist/:artistId" element={<Artist />} />
        </RouterRoutes>
    );
}
