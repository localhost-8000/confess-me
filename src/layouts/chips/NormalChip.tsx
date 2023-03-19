import Chip from '@mui/material/Chip'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';

interface NormalChipProps {
   title: string;
}

export default function NormalChip(props: NormalChipProps) {
   return (
      <Chip 
         icon={<FavoriteIcon />} 
         label={props.title} 
         variant="outlined" 
         color="error" 
         sx={{marginLeft: '4px'}}  
      />
   )
}
