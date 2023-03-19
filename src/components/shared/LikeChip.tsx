import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Chip } from '@mui/material';
import ToolTip from '~/layouts/tooltips/ToolTip';

interface LikeChipProps {
   likesCount: number;
   isLiked: boolean;
   likeHandlerCB: () => void;
}

function LikeChip(props: LikeChipProps) {

   return (
      <ToolTip title="Login to like this post">
         <Chip 
            aria-label="Like or Dislike" 
            icon={<FavoriteBorderIcon />} 
            label={props.likesCount} 
            onClick={props.likeHandlerCB} 
            color="secondary"
            variant={props.isLiked ? "filled" : "outlined"} 
            // sx={props.isLiked ? { bgcolor: '#333346' } : { color: '#333346'}}
         />
      </ToolTip>
   )
}

export default LikeChip
