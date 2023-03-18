import { User } from "firebase/auth";
import { AlertSeverity } from "./extra";

export type AuthState = {
   user: User | null;
   loading: boolean;
   authLoading: boolean;
   error: Error | null;
   errorMessage: string | null;
   snackbar: {
      open: boolean;
      message: string;
      severity?: AlertSeverity
   }
};

type SignInAction = {
   type: "SIGN_IN";
   payload: {
      user: User;
   }
}

type SignOutAction = {
   type: "SIGN_OUT";
}

export type ErrorAction = {
   type: "ERROR";
   payload: {
      error: Error;
      errorMessage: string;
   }
}

export type LoadingAction = {
   type: "LOADING";
   payload: {
      loading: boolean;
   }
}

export type SnackbarAction = {
   type: "SNACKBAR";
   payload: {
      open: boolean;
      message: string;
      severity?: AlertSeverity;
   }
}

export type AuthLoadingAction = {
   type: "AUTH_LOADING";
   payload: {
      authLoading: boolean;
   }
}

export type AuthActions = SignInAction | SignOutAction | ErrorAction | LoadingAction | SnackbarAction | AuthLoadingAction;

export type AuthContextProps = AuthState & {
   dispatch: (action: AuthActions) => void;
}