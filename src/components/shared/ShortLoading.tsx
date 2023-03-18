import { Backdrop, CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function ShortLoading() {
   const { dispatch } = useContext(AuthContext);

   const handleClose = () => {
      dispatch({
         type: "LOADING",
         payload: {
            loading: false
         }
      });
   }

   return (
      <div className="w-full h-full relative min-w-[200px] min-h-[100px]">
         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, width: '100%', height: '100%', position: 'absolute', borderRadius: '12px', bgcolor: '#44445e' }}
            open={true}
            onClick={handleClose}
            >
            <CircularProgress color="inherit" />
         </Backdrop>

      </div>
   )
}