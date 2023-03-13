import { Backdrop, CircularProgress } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function Loading() {
   const { loading, dispatch } = useContext(AuthContext);
   const [open, setOpen] = React.useState(loading);

   const handleClose = () => {
      setOpen(false);
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
