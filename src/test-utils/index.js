import { ThemeProvider } from '@mui/material';
import { render as rtlRender } from '@testing-library/react';

import { theme } from '../theme';
import { MemoryRouter } from 'react-router-dom';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

function providerRender(ui) {
    // eslint-disable-next-line
    function Wrapper({ children }) {
        const queryCache = new QueryCache();
        const queryClient = new QueryClient({
            queryCache,
            defaultOptions: {
                queries: {
                    retryDelay: 1,
                    retry: 0,
                },
            },
        });

        return (
            <MemoryRouter>
                <ThemeProvider theme={theme}>
                    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                </ThemeProvider>
            </MemoryRouter>
        );
    }
    return rtlRender(ui, { wrapper: Wrapper });
}

export * from '@testing-library/react';
export { providerRender };
