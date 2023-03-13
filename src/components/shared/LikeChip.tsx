import { Chip } from '@mui/material';
import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface LikeChipProps {
   likesCount: number;
   isLiked: boolean;
   likeHandlerCB: () => void;
}

function LikeChip(props: LikeChipProps) {

    return <Chip 
        aria-label="Like or Dislike" 
        icon={<FavoriteBorderIcon />} 
        label={props.likesCount} 
        onClick={props.likeHandlerCB} 
        color="secondary"
        variant={props.isLiked ? "filled" : "outlined"} 
    />
}

export default LikeChip
