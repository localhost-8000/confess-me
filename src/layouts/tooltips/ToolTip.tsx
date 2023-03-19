import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import React from 'react'
import { AuthContext } from '~/components/contexts/AuthContext';
import { styled } from '@mui/material/styles';

interface ToolTipProps {
   children: React.ReactElement;
   title: string;
}

export default function ToolTip(props: ToolTipProps) {
   const { user } = React.useContext(AuthContext);
   const [open, setOpen] = React.useState<boolean>(false);

   const handleOpen = () => {
      if(!user) setOpen(true);
   }

   const handleClose = () => {
      setOpen(false);
   }

   return (
      <BootstrapTooltip 
         title={props.title}
         arrow 
         open={open} 
         onOpen={handleOpen} 
         onClose={handleClose}
         
      >
         {props.children}
      </BootstrapTooltip>
   )
}

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} arrow classes={{ popper: className }} />))
   (({ theme }) => ({
      [`& .${tooltipClasses.arrow}`]: {
         color: '#70709e',
      },
      [`& .${tooltipClasses.tooltip}`]: {
         backgroundColor: '#70709e',
         fontSize: '0.8rem',
      },
}));