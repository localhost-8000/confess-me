import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import InterestsIcon from '@mui/icons-material/Interests';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { approvePost, rejectPost } from '~/utils/firebaseUtils/adminUtil';
import { Box } from '@mui/material';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { formatTimeAgo } from '~/utils/dateParser';
import { Post } from '~/types/post';

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

