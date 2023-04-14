import { base64urlEncodeWithoutPadding } from '@firebase/util';
import { formatTimeAgo } from '~/utils/dateParser';
import { getEditorContent } from '~/utils/postUtil';
import { logEvent } from 'firebase/analytics';
import { onValue, ref } from 'firebase/database';
import { reportPost, togglePostLike } from '~/utils/firebaseUtils/postUtil';
import { snackBarDispatchMsg } from '~/utils/dispatchActionsUtil';

import { useAnalytics, useDatabase } from '~/lib/firebase';
import { AddOrUpdateFlag } from '~/types/extra';
import { AuthActions } from '~/types/auth';
import { AuthContext } from '../contexts/AuthContext';
import { Box } from '@mui/material';
import { Post } from '~/types/post';
import { TextEditor } from '../post/TextEditor';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Comment from '../comment/Comment';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InterestsIcon from '@mui/icons-material/Interests';
import LikeChip from './LikeChip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NormalChip from '~/layouts/chips/NormalChip';
import PostMenu from './PostMenu';
import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import ToolTip from '~/layouts/tooltips/ToolTip';
import PostTags from '../post/PostTags';


interface PostCardType {
   post: Post;
   updatePostCB?: (updatedPost: Post, flag: AddOrUpdateFlag) => void;
}

const copyToClipboard = (text: string, dispatch: (action: AuthActions) => void) => {
   const navigator = window.navigator;
   const encodedId = base64urlEncodeWithoutPadding(text);
   const shareLink = `${window.location.origin}/post/${encodedId}`;

   if(!navigator.clipboard) {
      dispatch(snackBarDispatchMsg(`Share link: ${shareLink}`, 'success'));
      return;
   }

   navigator.clipboard.writeText(shareLink).then(() => {
      dispatch(snackBarDispatchMsg("Copied to clipboard.", 'success'));
   }, _ => {
      dispatch(snackBarDispatchMsg(`Share link: ${shareLink}`, 'success'));
   });
}

export default function PostCard(props: PostCardType) {
   const analytics = useAnalytics();
   const { post } = props;
   const { user, dispatch } = React.useContext(AuthContext);
   const [currentPost, setCurrentPost] = React.useState<Post>(props.post);
   const [userLikes, setUserLikes] = React.useState<boolean>(false);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const [expandComment, setExpandComment] = React.useState<boolean>(false);
   const [isAdminLikes, setIsAdminLikes] = React.useState<boolean>(false);

   React.useEffect(() => {
      const db = useDatabase();
      const postLikesCountRef = ref(db, `posts/${post.id}/likesCount`);

      const postLikesCountValue = onValue(postLikesCountRef, snapshot => {
         if(snapshot.exists()) {
            setCurrentPost({
               ...currentPost,
               [snapshot.key as string]: snapshot.val(),
            })
         } 
      });

      return postLikesCountValue;
   }, []);

   React.useEffect(() => {
      const db = useDatabase();
      const commentsCountRef = ref(db, `posts/${post.id}/commentsCount`);

      return onValue(commentsCountRef, snapshot => {
         if(snapshot.exists()) {
            setCurrentPost({
               ...currentPost,
               [snapshot.key as string]: snapshot.val(),
            });
         } 
      })
   }, []);

   React.useEffect(() => {
      const db = useDatabase();
      const userLikesRef = ref(db, `posts/${post.id}/likes/${user?.uid}`);
      return onValue(userLikesRef, snapshot => {
         let likes = false;
         let adminLikes = false;

         if(snapshot.exists()) {
            likes = true;
            const adminId = import.meta.env.VITE_ADMIN_UID;
            if(user?.uid === adminId) adminLikes = true;
         }

         setUserLikes(likes);
         setIsAdminLikes(adminLikes);
      });
   }, []);

   const postLikeHandler = () => {
      if(!post.id) return;
      if(!user) return;

      togglePostLike(post.id, user.uid)
      .then((data: Post | string) => {
         if(data !== "error") {
            logEvent(analytics, "post_like", {
               post_id: post.id,
               post_college: post.collegeData?.name,
               userId: user.uid,
            });
         }
      }).catch(_ => {
         dispatch(snackBarDispatchMsg("Error while liking the post.", "error"));
      });
   }

   const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      if(user) setAnchorEl(event.currentTarget);
   }

   const closeMenu = () => { setAnchorEl(null); }

   const reportPostHandler = () => {
      if(!post.id || !user) return;

      reportPost(post.id, user.uid).then(res => {
         if(res === "success") {
            dispatch({ type: "SNACKBAR", payload: { open: true, message: "Post reported successfully!!", severity: "success" }});
         } else if(res === "already_reported") {
            dispatch({ type: "SNACKBAR", payload: { open: true, message: "You've already reported this post!!", severity: "success" }});
         } else {
            dispatch({ type: "SNACKBAR", payload: { open: true, message: "Error while reporting the post!!", severity: "error" }});
         }
      });
   }

   const sharePost = () => {
      if(!post.id) return;
      copyToClipboard(post.id, dispatch);
      
      logEvent(analytics, "share", {
         method: "copy",
         content_type: "post",
         item_id: post.id,
      });
   }

   const handleExpandComment = () => {
      setExpandComment(!expandComment);
   }

  return (
    <Card sx={{ maxWidth: 600, width: '100%', marginBottom: '18px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#70709e', border: '2px solid #333346' }} aria-label="college">
            {post.collegeData?.logo ? <img src={post.collegeData?.logo} alt="college logo" className="w-8 h-8" /> : <InterestsIcon />}
          </Avatar>
        }
        action={
            <> <ToolTip title="Login required!">
               <IconButton aria-label="settings" onClick={openMenu}>
                  <MoreVertIcon />
               </IconButton>
               </ToolTip>
               <PostMenu anchorEl={anchorEl} handleCloseCB={closeMenu} reportPostCB={reportPostHandler} />
            </>
        }
        title={<PostTitle collegeName={post.collegeData?.name as string} isAdmin={post.isAdmin as boolean} />}
        subheader={formatTimeAgo(post.createdAt)}
        titleTypographyProps={{fontWeight: 'bold', color: '#333346', fontSize: '16px'}}
        subheaderTypographyProps={{color: '#333346'}}
      />
      <CardContent sx={{marginTop: '-6px'}} className="border-y-2 border-[#a5a5ba]">
         <Box sx={{marginX: '-8px', marginY: '-10px', fontSize: '18px'}} className="p-2 bg-gray-100 rounded-lg">
            <TextEditor 
               editorState={getEditorContent(post.confession)}
               onChangeCB={() => {}}
               isReadOnly={true}
            />
         </Box>
      </CardContent>
      <CardActions disableSpacing sx={{display: 'flex', flexDirection: 'column', gap: 0.7}}>
         <div className="w-full flex flex-wrap justify-start gap-1">
            <PostTags tags={post.tags} />
         </div>
         <div className="w-full flex justify-around items-center">
            <div className="">
               <LikeChip likesCount={currentPost.likesCount} isLiked={userLikes} likeHandlerCB={postLikeHandler} />
               {isAdminLikes ? <NormalChip title="Admin loved it" withIcon={true} /> : null}
               <IconButton 
                  aria-label="share" 
                  sx={{marginLeft: '8px'}} 
                  onClick={sharePost}>
                     <ShareIcon />
                  </IconButton>
            </div>
            <LikeChip likesCount={currentPost.commentsCount || 0} isLiked={expandComment} likeHandlerCB={handleExpandComment} isCommentChip />
         </div>
      </CardActions>
      <Collapse in={expandComment} timeout="auto" sx={{paddingBottom: '12px'}}>
         <Divider sx={{width: '80%', maxWidth: '301px', margin: 'auto', borderColor: '#6d6d8659'}} />
         <Comment postId={post.id} handleCloseCommentsCB={() => setExpandComment(false)} />
      </Collapse>
    </Card>
  );
}

const PostTitle = (props: {collegeName: string, isAdmin: boolean}) => {
   return (
      <p>{props.collegeName}
         {props.isAdmin ? <span className="bg-[#333346] text-white text-[12px] font-normal py-[2px] px-2    rounded-xl ml-1">Admin</span> 
         : null}
      </p>
   )
}