import { render } from '@testing-library/react';
import { Typography } from './Typography';

const testCopy = 'Foobar';

test('renders children', () => {
    const { getByText } = render(<Typography>{testCopy}</Typography>);
    const placeholderText = getByText(testCopy);
    expect(placeholderText).toBeInTheDocument();
});
