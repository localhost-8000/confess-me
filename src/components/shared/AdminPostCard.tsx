import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { Post } from '~/types/post';
import InterestsIcon from '@mui/icons-material/Interests';
import { formatTimeAgo } from '~/utils/dateParser';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { approvePost, rejectPost } from '~/utils/firebaseUtils/adminUtil';

interface PostCardType {
   post: Post;
   removePostCB: (id: Post['id']) => void;
}

const getEditorContent = (confession: string) => {
   if(!confession) return EditorState.createEmpty();
   const json = JSON.parse(confession);
   const rawContent = convertFromRaw(json);
   const editorState = EditorState.createWithContent(rawContent);
   return editorState;
}

export default function AdminPostCard(props: PostCardType) {
   const { post, removePostCB } = props;

   const approvePostHandler = () => {
      approvePost(post).then(() => {
         removePostCB(post.id);
         alert('Post approved!');
      });
   }

   const rejectPostHandler = () => {
      if(!post.id) return;
      rejectPost(post.id).then(() => {
         removePostCB(post.id);
         alert('Post rejected!');
      })
   }

  return (
    <Card sx={{ maxWidth: 500, width: '100%', marginX: '12px', marginY: '8px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#70709e' }} aria-label="recipe">
            {post.collegeData?.logo ? <img src={post.collegeData?.logo} alt="college logo" className="w-8 h-8" /> : <InterestsIcon />}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.collegeData?.name}
        subheader={formatTimeAgo(post.createdAt)}
      />
      <CardContent sx={{marginTop: '-6px'}} className="border-y-2">
        <Box sx={{marginX: '-8px', marginY: '-10px', fontSize: '18px'}} className="p-2 bg-gray-100 rounded-lg">
         <Editor 
            editorState={getEditorContent(post.confession)}
            onChange={() => {}}
            readOnly={true}
         />
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant='contained' color="success" onClick={approvePostHandler}>Approve</Button>
        <Button color="error" sx={{marginLeft: '12px'}} onClick={rejectPostHandler}>Reject</Button>
      </CardActions>
    </Card>
  );
}

