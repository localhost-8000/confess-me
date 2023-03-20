import { AuthContext } from '../contexts/AuthContext';
import { Backdrop, CircularProgress } from '@mui/material';
import { useContext } from 'react';

export default function Loading() {
   const { authLoading, dispatch } = useContext(AuthContext);

   const handleClose = () => {
      dispatch({
         type: "AUTH_LOADING",
         payload: {
            authLoading: false
         }
      });
   }

   return (
      <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={authLoading}
         onClick={handleClose}
         >
         <CircularProgress color="inherit" />
      </Backdrop>
   )
}
