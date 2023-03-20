import { Backdrop, CircularProgress } from '@mui/material';

interface ShortLoadingProps {
   loading: boolean;
}

export default function ShortLoading(props: ShortLoadingProps) {

   return (
      <div className="w-full h-full relative min-w-[200px] min-h-[100px]">
         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, width: '100%', height: '100%', position: 'absolute', borderRadius: '12px', bgcolor: '#333346' }}
            open={props.loading}
            >
            <CircularProgress color="inherit" />
         </Backdrop>

      </div>
   )
}