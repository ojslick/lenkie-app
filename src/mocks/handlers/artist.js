import { rest } from 'msw';
import { mockAlbums, mockArtist, mockTopSongs } from '../../test-utils/mocks';

export const artistHandlers = [
    rest.get('https://api.deezer.com/artist/:artistId', (req, res, ctx) => {
        const { artistId } = req.params;
        return res(ctx.status(200), ctx.json({ ...mockArtist, id: artistId }));
    }),
    rest.get('https://api.deezer.com/artist/:artistId/top', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockTopSongs));
    }),
    rest.get('https://api.deezer.com/artist/:artistId/albums', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockAlbums));
    }),
];
