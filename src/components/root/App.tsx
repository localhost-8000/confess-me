import { AuthContextProvider } from "../contexts/AuthContext";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import {HelmetProvider} from "react-helmet-async";
import Main from "~/components/root/Main";

const theme = createTheme({
   palette: {
      primary: {
         main: "#1a73e8",
      }
   }
});

export const App = () => {
   return (
      <HelmetProvider>
         <AuthContextProvider>
            <ThemeProvider theme={theme}>
               <Main />
            </ThemeProvider>
         </AuthContextProvider>
      </HelmetProvider>
   )
};
