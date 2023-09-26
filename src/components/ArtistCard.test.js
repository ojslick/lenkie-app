import useMediaQuery from '@mui/material/useMediaQuery';
import { providerRender as render, screen } from '../test-utils';
import { mockArtists } from '../test-utils/mocks';
import { ArtistCard } from './ArtistCard';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

jest.mock('@mui/material/useMediaQuery', () => jest.fn());
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

test('should show total albums', () => {
    render(<ArtistCard artist={mockArtists.data[0]} />);
    expect(screen.getByText('68 albums')).toBeInTheDocument();
});

test('should not render total albums', () => {
    useMediaQuery.mockImplementation(() => true);
    render(<ArtistCard artist={mockArtists.data[0]} />);
    expect(screen.queryByText('68 albums')).not.toBeInTheDocument();
});

test('should navigate to artist page', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);
    render(<ArtistCard artist={mockArtists.data[0]} />);
    userEvent.click(screen.getByTestId('artist-card'));
    expect(mockNavigate).toHaveBeenCalledWith('/artist/4338602');
});
