import { AuthContext } from "../contexts/AuthContext";
import { Router } from "~/components/router/Router";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setupFirebase } from "~/lib/firebase";
import { useContext, useEffect } from "react";

import SnackBar from "../shared/SnackBar";
import Loading from "../shared/Loading";

export default function Main () {
   const { authLoading, user, dispatch } = useContext(AuthContext);

   useEffect(() => {
      const checkAuth = () => {
         if(user) return;

         dispatch({type: "AUTH_LOADING", payload: { authLoading: true }});
         setupFirebase();

         const auth = getAuth();

         onAuthStateChanged(auth, (user) => {
            if (user) {
               dispatch({
                  type: "SIGN_IN",
                  payload: { user }
               });
            } else {
               dispatch({ type: "SIGN_OUT" });
            }
         });
      }
      checkAuth();
   }, []);

   return (
      <main className="min-h-screen w-screen inline-block">
         { authLoading ? <Loading /> : <>
            <Router />
            <SnackBar />
         </> }
      </main>
   );
}
