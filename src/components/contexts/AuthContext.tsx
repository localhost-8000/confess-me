import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { setupFirebase } from "~/lib/firebase";
import { AuthContextProps, AuthState } from "~/types/auth";
import { AuthReducer } from "./AuthReducer";

let INITIAL_STATE: AuthState = {
   user: null,
   loading: false,
   authLoading: false,
   error: null,
   errorMessage: null,
   snackbar: {
      open: false,
      message: "",
      severity: "success"
   }
}

export const AuthContext = createContext<AuthContextProps>({...INITIAL_STATE, dispatch: () => {} });

export const AuthContextProvider = ({ children }: { children: ReactNode}) => {
   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

   return (
      <AuthContext.Provider value={{ 
         user: state.user,
         loading: state.loading,
         authLoading: state.authLoading,
         error: state.error,
         errorMessage: state.errorMessage,
         snackbar: state.snackbar,
         dispatch }} 
      >
         {children}
      </AuthContext.Provider>
   )
}
