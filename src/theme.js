import { createTheme } from '@mui/material/styles';

export const darkGray = '#263746';
export const green = '#29CC9A';
export const coral = '#E46868';

export const theme = createTheme({
    palette: {
        error: {
            main: coral,
        },
        success: {
            main: green,
        },
        text: {
            primary: darkGray,
        },
    },
});
