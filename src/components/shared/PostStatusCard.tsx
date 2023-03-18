import InterestsIcon from '@mui/icons-material/Interests';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';

import { Box } from '@mui/material';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { PostWithStatus } from '~/types/post';
import { formatTimeAgo } from '~/utils/dateParser';

interface PostCardType {
   post: PostWithStatus;
}

const getEditorContent = (confession: string) => {
   if(!confession) return EditorState.createEmpty();
   const json = JSON.parse(confession);
   const rawContent = convertFromRaw(json);
   const editorState = EditorState.createWithContent(rawContent);
   return editorState;
}

const getColor = (status: string) => {
   switch(status) {
      case 'approved':
         return 'success';
      case 'rejected':
         return 'error';
      default:
         return 'info';
   }
}

export default function PostStatusCard(props: PostCardType) {
   const { post } = props;

  return (
    <Card sx={{ maxWidth: 600, width: '100%', marginTop: '18px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#70709e', border: '2px solid #333346' }} aria-label="college">
            {post.collegeData?.logo ? <img src={post.collegeData?.logo} alt="college logo" className="w-8 h-8" /> : <InterestsIcon />}
          </Avatar>
        }
      //   action={}
        title={post.collegeData?.name}
        subheader={formatTimeAgo(post.createdAt)}
        titleTypographyProps={{fontWeight: 'bold', color: '#333346', fontSize: '16px'}}
        subheaderTypographyProps={{color: '#333346'}}
      />
      <CardContent sx={{marginTop: '-6px'}} className="border-y-2 border-[#a5a5ba]">
        <Box sx={{marginX: '-8px', marginY: '-10px', fontSize: '18px'}} className="p-2 bg-gray-100 rounded-lg">
         <Editor 
            editorState={getEditorContent(post.confession)}
            onChange={() => {}}
            readOnly={true}
         />
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <Chip label={post.status.toUpperCase()} color={getColor(post.status)} />
        <Chip label={getMessage(post.status)} sx={{marginLeft: '6px'}} />
      </CardActions>
    </Card>
  );
}

const getMessage = (status: string) => {
   switch(status) {
      case 'approved':
         return 'Your post is streaming live now.';
      case 'rejected':
         return 'Post rejected due to inappropriate content.';
      default:
         return 'Team still reviewing your post.';
   }
}