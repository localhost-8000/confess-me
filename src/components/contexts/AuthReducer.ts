import { AuthActions, AuthState } from "~/types/auth";

export const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {
   switch(action.type) {
      case "SIGN_IN": 
         return {
            ...state,
            user: action.payload.user,
            authLoading: false
         }
      case "SIGN_OUT":
         return {
            ...state,
            user: null,
            authLoading: false
         }
      case "LOADING":
         return {
            ...state,
            loading: action.payload.loading
         }
      case "ERROR":
         return {
            ...state,
            error: action.payload.error,
            errorMessage: action.payload.errorMessage
         }
      case "SNACKBAR":
         return {
            ...state,
            snackbar: {
               open: action.payload.open,
               message: action.payload.message,
               severity: action.payload.severity
            }
         }
      case "AUTH_LOADING":
         return {
            ...state,
            authLoading: action.payload.authLoading
         }
      default: return state;
   }
}