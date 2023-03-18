import { Router } from "~/components/router/Router";
import { setupFirebase } from "~/lib/firebase";
import { useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";
import SnackBar from "../shared/SnackBar";
import Loading from "../shared/Loading";

export default function Main () {
   const { user, dispatch } = useContext(AuthContext);

   useEffect(() => {
      const checkAuth = () => {
         if(user) return;

         dispatch({type: "AUTH_LOADING", payload: { authLoading: true }});
         setupFirebase();

         const auth = getAuth();
         dispatch({type: "LOADING", payload: { loading: true }});
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
         <Router />
         <SnackBar />
      </main>
   );
}
