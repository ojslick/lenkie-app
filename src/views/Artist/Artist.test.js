import { QueryCache } from 'react-query';
import { providerRender as render, screen, waitFor } from '../../test-utils';
import { Artist } from './Artist';
import { server } from '../../mocks/server';
import { useParams } from 'react-router-dom';
import { rest } from 'msw';
import { ToastContainer } from 'react-toastify';
import useMediaQuery from '@mui/material/useMediaQuery';

jest.mock('@mui/material/useMediaQuery', () => jest.fn());
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

const queryCache = new QueryCache();

beforeEach(() => {
    useParams.mockImplementation(() => ({ artistId: '1000' }));
});

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    jest.clearAllMocks();
    queryCache.clear();
    server.resetHandlers();
    jest.clearAllTimers();
});

afterAll(() => {
    server.close();
});

test('should render artist data, top songs, and albums', async () => {
    render(<Artist />);

    await waitFor(() => {
        expect(screen.getByText('Gilbert B\u00e9caud')).toBeInTheDocument();
        expect(screen.getByText('Total Fans: 89,838')).toBeInTheDocument();
        expect(screen.getByText('Top songs')).toBeInTheDocument();
        expect(screen.getByText('Albums')).toBeInTheDocument();
    });
});

test('should show loading state when fetching data', () => {
    render(<Artist />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('should show error toast when fetching artist data', async () => {
    server.use(
        rest.get('https://api.deezer.com/artist/1000', (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );

    render(
        <>
            <Artist />
            <ToastContainer />
        </>
    );

    await waitFor(() => {
        expect(
            screen.getByText('Something went wrong, the was an error fetching this artist')
        ).toBeInTheDocument();
    });
});

test('should show error toast when fetching top songs', async () => {
    server.use(
        rest.get('https://api.deezer.com/artist/1000/top', (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );

    render(
        <>
            <Artist />
            <ToastContainer />
        </>
    );

    await waitFor(() => {
        expect(
            screen.getByText('Something went wrong, the was an error fetching top songs')
        ).toBeInTheDocument();
    });
});

test('should show error toast when fetching albums', async () => {
    server.use(
        rest.get('https://api.deezer.com/artist/1000/albums', (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );

    render(
        <>
            <Artist />
            <ToastContainer />
        </>
    );

    await waitFor(() => {
        expect(
            screen.getByText('Something went wrong, the was an error fetching albums')
        ).toBeInTheDocument();
    });
});

test('should show No data message when no albums are found', async () => {
    server.use(
        rest.get('https://api.deezer.com/artist/1000/albums', (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ data: [] }));
        })
    );

    render(<Artist />);

    await waitFor(() => {
        expect(screen.getByText('No albums found')).toBeInTheDocument();
    });
});

test('should show No data message when no top songs are found', async () => {
    server.use(
        rest.get('https://api.deezer.com/artist/1000/top', (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ data: [] }));
        })
    );

    render(<Artist />);

    await waitFor(() => {
        expect(screen.getByText('No top songs found')).toBeInTheDocument();
    });
});

test('should change style when on mobile', async () => {
    useMediaQuery.mockImplementation((cb) => cb({ breakpoints: { down: () => true } }));

    render(<Artist />);

    await waitFor(() => {
        expect(screen.getByTestId('artist-media-list-container')).toHaveStyle({
            display: 'inline-block',
        });
        expect(screen.getByTestId('top-songs-media-list-container')).toHaveStyle({
            width: '100%',
        });
        expect(screen.getByTestId('album-media-list-container')).toHaveStyle({
            width: '100%',
        });
    });
});
