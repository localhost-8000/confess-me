import { Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup,  UserCredential, getAdditionalUserInfo } from "firebase/auth";
import { useAnalytics, useAuth } from "~/lib/firebase";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useContext } from "react";
import { AuthContext } from "~/components/contexts/AuthContext";
import { logEvent } from "firebase/analytics";

export const SignInButton = () => {
   const { dispatch } = useContext(AuthContext);

   const handleClick = async () => {
      const provider = new GoogleAuthProvider();
      const auth = useAuth();
      auth.languageCode = "en";

      const result : UserCredential = await signInWithPopup(auth, provider);

      if (result.user) {
         const newUser = getAdditionalUserInfo(result)?.isNewUser
         const analytics = useAnalytics();
         if(newUser) {
            logEvent(analytics, "sign_up", {
               method: "Google",
            });
         } else {
            logEvent(analytics, "login", {
               method: "Google",
            });
         }
         dispatch({
            type: "SIGN_IN",
            payload: {
               user: result.user,
            }
         });
      }  
   };

   return (
      <Button 
         variant="contained" 
         endIcon={<RocketLaunchIcon />}
         onClick={handleClick}
         sx={{
            backgroundColor: "#857dff", 
            color: 'white', 
            fontSize: '18px', 
            fontWeight: 'bold',
            ":hover": {
               backgroundColor: "#554eba",
            }
         }}>
            Sign in with Google
      </Button>
   );
};
