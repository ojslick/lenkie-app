import { render, screen } from '@testing-library/react';
import { Artist } from './Artist';

test('should render Artist page', () => {
    render(<Artist />);
    expect(screen.getByRole('heading', { name: /artist/i })).toBeInTheDocument();
});
