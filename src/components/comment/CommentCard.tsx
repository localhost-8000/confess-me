import { formatTimeAgo } from '~/utils/dateParser';
import { Avatar } from '@mui/material';
import { PostComment } from '~/types/post';

import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


interface CommentCardProps {
   comment: PostComment;
}

export default function CommentCard(props: CommentCardProps) {
   const { authorName, authorPhotoUrl, comment, createdAt } = props.comment;
   return (
      <div className="pt-1">
         <CardHeader
            avatar={
               <Avatar 
                  sx={{ bgcolor: '#70709e', width: '35px', height: '35px' }} 
                  aria-label="user"
                  src={authorPhotoUrl ? authorPhotoUrl : undefined}
               >
                  {authorName ? authorName[0] : 'A'}
               </Avatar>
            }
            title={authorName || 'Anonymous'}
            subheader={formatTimeAgo(createdAt)}
            titleTypographyProps={{fontWeight: '600', color: '#333346', fontSize: '13px'}}
            subheaderTypographyProps={{color: '#333346d5', fontSize: '11px'}}
            sx={{padding: '6px', margin: '0px'}}
         />
         <CardContent sx={{marginLeft: '58px', padding: '0px', marginBottom: '-30px'}} className=" border-[#a5a5ba]">
            <div className="-mt-[8px] pr-2">
               <p className="text-[15px] text-gray-800">{ comment }</p>
            </div>
         </CardContent>
      </div>
   )
}
