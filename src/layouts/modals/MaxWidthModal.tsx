import { Button } from '@mui/material';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

interface MaxWidthModalProps {
   children: React.ReactNode;
   open: boolean;
   title: string;
   handleCloseCB: () => void;
}

export default function MaxWidthModal(props: MaxWidthModalProps) {

   return (
      <Dialog
        fullWidth
        maxWidth="sm"
        open={props.open}
        onClose={props.handleCloseCB}
      >
         <DialogTitle>{ props.title }</DialogTitle>
         <DialogContent>
            <DialogContentText>
               { props.children }
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={props.handleCloseCB} variant="outlined" color="info">Close</Button>
         </DialogActions>
      </Dialog>
   )
}
