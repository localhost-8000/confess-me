import { Button } from '@mui/material'
import { AlertSeverity } from '~/types/extra';

interface TextBtnProps {
   onClickCB: () => void;
   text: string;
   sx?: any;
   color: AlertSeverity
}

export default function TextBtn(props: TextBtnProps) {

   return (
      <Button 
         color={props.color}
         onClick={props.onClickCB}
         sx={props.sx} 
         variant="outlined"
      >
         {props.text}
      </Button>
   )
}
