import React from 'react'
import { Avatar } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { PostComment } from '~/types/post';
import { formatTimeAgo } from '~/utils/dateParser';

interface CommentCardProps {
   comment: PostComment;
}

export default function CommentCard(props: CommentCardProps) {
   const { authorName, authorPhotoUrl, comment, createdAt } = props.comment;
   return (
      <div className="pt-3">
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
            titleTypographyProps={{fontWeight: '600', color: '#333346', fontSize: '14px'}}
            subheaderTypographyProps={{color: '#333346d5', fontSize: '12px'}}
            sx={{padding: '10px', margin: '0px'}}
         />
         <CardContent sx={{marginLeft: '58px', padding: '0px', marginBottom: '-30px'}} className=" border-[#a5a5ba]">
            <div className="-mt-[6px] pr-2">
               <p className="text-[16px] text-gray-800">{ comment }</p>
            </div>
         </CardContent>
      </div>
   )
}
