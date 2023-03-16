import { AuthContext } from '../contexts/AuthContext';
import { Backdrop, CircularProgress } from '@mui/material';
import { useContext } from 'react';

export default function Loading() {
   const { loading, dispatch } = useContext(AuthContext);

   const handleClose = () => {
      dispatch({
         type: "LOADING",
         payload: {
            loading: false
         }
      });
   }

   return (
      <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={loading}
         onClick={handleClose}
         >
         <CircularProgress color="inherit" />
      </Backdrop>
   )
}
