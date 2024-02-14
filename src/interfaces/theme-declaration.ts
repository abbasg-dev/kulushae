declare module '@mui/material/styles' {
    interface Theme {
        palette?: {
            primary?: {
                main?: string;
            };
            secondary?: {
                main?: string;
            };
            common?: {
                black?: string,
                white?: string
            };
            text?: {
                primary?: string,
            };
            typography?: {
                fontWeightRegular?: number;
                fontWeightMedium?: number;
            },
        };
    }
}