import { providerRender as render, screen } from '../test-utils';
import { Navbar } from './Navbar';

test('should render Navbar component', () => {
    render(<Navbar />);

    expect(screen.getByText('Artist Search')).toBeInTheDocument();
});
