import { rest } from 'msw';
import { mockArtists } from '../../test-utils/mocks';

export const searchHandlers = [
    rest.get('https://api.deezer.com/search/artist*', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockArtists));
    }),
];
