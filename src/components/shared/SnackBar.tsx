import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../contexts/AuthContext';
import { Alert } from '@mui/material';
import { AlertSeverity } from '~/types/extra';

export default function SnackBar() {
   const { snackbar, dispatch} = React.useContext(AuthContext);

   const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
      // if (reason === 'clickaway') {
      //   return;
      // }

      dispatch({
         type: "SNACKBAR",
         payload: {
            open: false,
            message: "",
         }
      });
   }

   const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

   const AlertPopUp = (message: string, severity?: AlertSeverity) => {

      return (
         <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            { message }
         </Alert>
      )
   }

   return (
      <Snackbar 
         open={snackbar.open}
         autoHideDuration={5000}
         onClose={handleClose}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         sx={{ width: '40%', maxWidth: '100%', minWidth: '300px'}}
      >
         { AlertPopUp(snackbar.message, snackbar.severity) }
      </Snackbar>
   )
}
