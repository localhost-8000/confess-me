import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LikeChip from './LikeChip';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { Post } from '~/types/post';
import InterestsIcon from '@mui/icons-material/Interests';
import { formatTimeAgo } from '~/utils/dateParser';
import { togglePostLike } from '~/utils/firebaseUtils/postUtil';
import { Box } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { AddOrUpdateFlag } from '~/types/extra';

interface PostCardType {
   post: Post;
   updatePostCB: (updatedPost: Post, flag: AddOrUpdateFlag) => void;
}

const getEditorContent = (confession: string) => {
   if(!confession) return EditorState.createEmpty();
   const json = JSON.parse(confession);
   const rawContent = convertFromRaw(json);
   const editorState = EditorState.createWithContent(rawContent);
   return editorState;
}

const isUserLiked = (userId: string, post: Post) => {
   if(post.likes && post.likes[userId]) return true;
   return false;
}

export default function PostCard(props: PostCardType) {
   const { post, updatePostCB } = props;
   const { user, dispatch } = React.useContext(AuthContext);
   const [currentPost, setCurrentPost] = React.useState<Post>(props.post);
   const [userLikes, setUserLikes] = React.useState<boolean>(() => isUserLiked(user?.uid || "", post));

   React.useEffect(() => {
      updatePostCB(currentPost, "update");
      setUserLikes(isUserLiked(user?.uid || "", currentPost));
   }, [currentPost, currentPost.likesCount, currentPost.likes]);

   const postLikeHandler = () => {
      if(!post.id) return;
      if(!user) return;

      togglePostLike(post.id, user.uid)
      .then((data: Post | string) => {
         if(data !== "error") {
            setCurrentPost({
               ...currentPost,
               likesCount: (data as Post).likesCount,
               likes: (data as Post).likes,
            });
         }
      }).catch(_ => {
         dispatch({ type: "SNACKBAR", payload: { open: true, message: "Error while liking the post!!", severity: "error" }});
      })
   }

  return (
    <Card sx={{ maxWidth: 600, width: '100%', marginBottom: '18px' }}>
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
        <LikeChip likesCount={currentPost.likesCount} isLiked={userLikes} likeHandlerCB={postLikeHandler} />
      </CardActions>
    </Card>
  );
}

