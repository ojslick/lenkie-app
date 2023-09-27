import GoogleAnalytics from 'react-ga4';
import { useLocation } from 'react-router-dom';
import { providerRender as render, waitFor } from '../../test-utils';
import { GoogleAnalyticsTracker } from './GoogleAnalyticsTracker';

const mockLocation = {
    pathname: 'foo',
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

jest.spyOn(GoogleAnalytics, 'initialize');
jest.spyOn(GoogleAnalytics, 'send');

beforeEach(() => {
    useLocation.mockImplementation(() => mockLocation);
});

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.restoreAllMocks();
});

test('calls GoogleAnalytics.initialize on render', async () => {
    render(<GoogleAnalyticsTracker />);
    await waitFor(() => {
        expect(GoogleAnalytics.initialize).toHaveBeenCalledTimes(1);
    });
});

test('sends the correct page location', async () => {
    render(<GoogleAnalyticsTracker />);
    await waitFor(() => {
        expect(GoogleAnalytics.send).toHaveBeenCalledWith({ hitType: 'pageview', page: 'foo' });
    });
});
