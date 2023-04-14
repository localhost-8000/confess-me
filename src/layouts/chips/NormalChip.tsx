import Chip from '@mui/material/Chip'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';

interface NormalChipProps {
   title: string;
   sx?: any;
   withIcon?: boolean;
   icon?: React.ReactElement;
   color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
   variant?: 'outlined' | 'filled';
}

export default function NormalChip(props: NormalChipProps) {
   return (
      <Chip 
         icon={props.withIcon ? props.icon || <FavoriteIcon /> : undefined} 
         label={props.title} 
         variant={props.variant || 'outlined'} 
         color={props.color || 'error'}
         sx={props.sx || {marginLeft: '4px'}}  
      />
   )
}
