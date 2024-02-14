import { createTheme, responsiveFontSizes } from "@mui/material";
export let theme = createTheme({
    palette: {
        primary: {
            main: '#000'
        },
        secondary: {
            main: '#FFF'
        },
        common: {
            black: '#FFF',
            white: '#000'
        },
        text: {
            primary: '#FFF',
        }
    },
    typography: {
        fontFamily: ['Roboto'].join(','),
        button: { textTransform: 'none' },
    },
})

theme = responsiveFontSizes(theme);
