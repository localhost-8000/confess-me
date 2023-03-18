import { LoadingAction, SnackbarAction } from "~/types/auth"
import { AlertSeverity } from "~/types/extra"

export const snackBarDispatchMsg = (message: string, severity: AlertSeverity): SnackbarAction => {
   return {
      type: "SNACKBAR",
      payload: {
         open: true,
         message,
         severity,
      }
   }
}

export const loadingMsg = (loading: boolean): LoadingAction => {
   return {
      type: "LOADING",
      payload: {
         loading,
      }
   }
}