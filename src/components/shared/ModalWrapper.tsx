import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';

interface ModalWrapperProps {
   open: boolean;
   children: React.ReactNode;
   handleCloseCB: () => void;
}

export default function ModalWrapper(props: ModalWrapperProps) {

   return (
      <Dialog
        fullWidth
        maxWidth="sm"
        open={props.open}
        onClose={props.handleCloseCB}
      >
         <DialogTitle>Why you need signup...?</DialogTitle>
         <DialogContent>
            <DialogContentText>
               { props.children }
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={props.handleCloseCB}>Close</Button>
         </DialogActions>
      </Dialog>
   )
}
