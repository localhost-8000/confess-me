import { AlertSeverity } from '~/types/extra';
import { LoadingButton } from '@mui/lab';

interface LoadingBtnProps {
   loading: boolean;
   onClick: () => void;
   text: string;
   sx?: any;
   variant?: 'text' | 'outlined' | 'contained';
   color?: AlertSeverity
}

export default function LoadingBtn(props: LoadingBtnProps) {
   return <LoadingButton 
      color={props.color || 'info'}
      loading={props.loading}
      onClick={props.onClick}
      sx={props.sx}
      variant={props.variant || 'contained'}
   >
      {props.text}
   </LoadingButton>
}
