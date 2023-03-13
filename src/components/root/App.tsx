import {HelmetProvider} from "react-helmet-async";
import Main from "~/components/root/Main";
import { AuthContextProvider } from "../contexts/AuthContext";

export const App = () => {
   return (
      <HelmetProvider>
         <AuthContextProvider>
            <Main />
         </AuthContextProvider>
      </HelmetProvider>
   )
};
