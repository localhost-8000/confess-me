import { AuthContext } from '../contexts/AuthContext';
import { Chip } from '@mui/material';
import { useContext } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface LikeChipProps {
   likesCount: number;
   isLiked: boolean;
   likeHandlerCB: () => void;
}

function LikeChip(props: LikeChipProps) {
   const { user } = useContext(AuthContext);

   return <Chip 
      aria-label="Like or Dislike" 
      icon={<FavoriteBorderIcon />} 
      label={props.likesCount} 
      onClick={props.likeHandlerCB} 
      color="secondary"
      variant={props.isLiked ? "filled" : "outlined"} 
      disabled={!user}
      // sx={props.isLiked ? { bgcolor: '#333346' } : { color: '#333346'}}
   />
}

export default LikeChip
