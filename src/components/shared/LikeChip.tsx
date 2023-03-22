import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Chip } from '@mui/material';
import ToolTip from '~/layouts/tooltips/ToolTip';
import CommentIcon from '@mui/icons-material/Comment';

interface LikeChipProps {
   likesCount: number;
   isLiked: boolean;
   likeHandlerCB: () => void;
   isCommentChip?: boolean;
}

function LikeChip(props: LikeChipProps) {

   return (
      props.isCommentChip ? 
         <Chip 
            aria-label="Show comments"
            icon={<CommentIcon />}
            label={props.likesCount}
            sx={{marginLeft: 'auto', paddingLeft: '4px'}}
            onClick={props.likeHandlerCB}
            variant={props.isLiked ? "filled" : "outlined"} 
         /> :
         <ToolTip title="Login required to like!">
            <Chip 
               aria-label="Like or Dislike" 
               icon={<FavoriteBorderIcon />} 
               label={props.likesCount} 
               onClick={props.likeHandlerCB} 
               color="secondary"
               variant={props.isLiked ? "filled" : "outlined"} 
            />
         </ToolTip>
   )
}

export default LikeChip
