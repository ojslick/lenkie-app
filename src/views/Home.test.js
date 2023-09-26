import React from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { QueryCache } from 'react-query';
import { Home } from './Home';
import { providerRender as render } from '../test-utils';
import { server } from '../mocks/server';
import { rest } from 'msw';
import { ToastContainer } from 'react-toastify';

const queryCache = new QueryCache();

jest.mock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: jest.fn(),
}));

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

test('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('Search for an artist...')).toBeInTheDocument();
});

test('shows loading state when fetching data', () => {
    jest.useFakeTimers();

    render(<Home />);
    const input = screen.getByPlaceholderText('Search for an artist...');
    fireEvent.change(input, { target: { value: 'Burna' } });

    act(() => {
        jest.runAllTimers();
    });

    expect(screen.queryByRole('progressbar')).toBeInTheDocument();
});

test('displays artists when data is present', async () => {
    jest.useFakeTimers();

    render(<Home />);
    const input = screen.getByPlaceholderText('Search for an artist...');
    fireEvent.change(input, { target: { value: 'Burna' } });

    act(() => {
        jest.advanceTimersByTime(500);
    });

    expect(screen.queryByRole('progressbar')).toBeInTheDocument();
    await waitFor(() => {
        expect(screen.getByText('Burna Boy')).toBeInTheDocument();
        expect(screen.getByText('Burna Bandz')).toBeInTheDocument();
    });

    jest.useRealTimers();
});

test('shows no artist found message when there are no results', async () => {
    jest.useFakeTimers();
    server.use(
        rest.get('https://api.deezer.com/search/artist*', (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ data: [], total: 0 }));
        })
    );
    render(<Home />);
    const input = screen.getByPlaceholderText('Search for an artist...');
    fireEvent.change(input, { target: { value: 'Burna' } });

    act(() => {
        jest.advanceTimersByTime(500);
    });
    await waitFor(() => {
        expect(screen.getByText('No artist found')).toBeInTheDocument();
    });
});

test('handles search input and resets pagination', async () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Search for an artist...');
    fireEvent.change(input, { target: { value: 'Burna' } });
    await waitFor(() => {
        expect(input).toHaveValue('Burna');
    });
});

test('displays pagination when data is present', async () => {
    jest.useFakeTimers();
    render(<Home />);
    const input = screen.getByPlaceholderText('Search for an artist...');
    fireEvent.change(input, { target: { value: 'Burna' } });
    act(() => {
        jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
});

test('updates page correctly when pagination is clicked', async () => {
    jest.useFakeTimers();
    render(<Home />);
    const input = screen.getByPlaceholderText('Search for an artist...');
    fireEvent.change(input, { target: { value: 'Burna' } });
    act(() => {
        jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
        expect(screen.getByText('Burna Bandz')).toBeInTheDocument();
    });
    const page2Button = screen.getByLabelText('Go to page 2');
    fireEvent.click(page2Button);

    expect(screen.queryByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText('Burna Bandz')).toBeInTheDocument();
    });

    expect(screen.getByLabelText('page 2')).toHaveClass('Mui-selected');
});

test('should not got to another page if current page pagination button is clicked', async () => {
    jest.useFakeTimers();
    render(<Home />);
    const input = screen.getByPlaceholderText('Search for an artist...');
    fireEvent.change(input, { target: { value: 'Burna' } });
    act(() => {
        jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
        expect(screen.getByText('Burna Bandz')).toBeInTheDocument();
    });
    const page2Button = screen.getByLabelText('page 1');
    fireEvent.click(page2Button);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 2')).not.toHaveClass('Mui-selected');
});

test('should show error toast if there is an error fetching the artists', async () => {
    jest.useFakeTimers();
    server.use(
        rest.get('https://api.deezer.com/search/artist*', (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );
    render(
        <>
            <Home />
            <ToastContainer />
        </>
    );
    const input = screen.getByPlaceholderText('Search for an artist...');
    fireEvent.change(input, { target: { value: 'Burna' } });
    act(() => {
        jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
        expect(
            screen.getByText('Something went wrong, please try again later')
        ).toBeInTheDocument();
    });
});
