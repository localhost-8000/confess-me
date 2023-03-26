import { Button } from '@mui/material';
import { AlertSeverity } from '~/types/extra';

interface FilledBtnProps {
   text: string;
   color: AlertSeverity
   sx?: any;
   onClickCB: () => void;
}

export default function FilledBtn(props: FilledBtnProps) {
   return (
      <Button 
         color={props.color}
         onClick={props.onClickCB}
         sx={props.sx} 
         variant="contained"
      >
         {props.text}
      </Button>
   )
}
