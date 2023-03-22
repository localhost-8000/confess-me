import React from 'react'
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import { AuthContext } from '../contexts/AuthContext';
import { addCommentToPost } from '~/utils/databaseOps/comment';
import { snackBarDispatchMsg } from '~/utils/dispatchActionsUtil';
import LoadingBtn from '~/layouts/buttons/LoadingBtn';
import { Link } from 'react-router-dom';

interface AddCommentProps {
   postId: string | undefined;
}

export default function AddComment(props: AddCommentProps) {
   const { user, dispatch } = React.useContext(AuthContext);
   const [comment, setComment] = React.useState<string>("");
   const [loading, setLoading] = React.useState(false);

   const addComment = () => {
      if(!user || !props.postId) return;
      if(comment.trim() === "") {
         dispatch(snackBarDispatchMsg("Bro, write something!", "error"));
         return;
      }
      setLoading(true);

      addCommentToPost(props.postId, comment, user.displayName || "", user.photoURL || "").then(res => {
         if(res === "success") {
            setComment("");
            dispatch(snackBarDispatchMsg("Comment added!", "success"));
         } else {
            dispatch(snackBarDispatchMsg("Error adding comment!", "error"));
         }
         setLoading(false);
      });
   }

   return ( user ? 
      <div className="flex flex-col gap-5 w-[95%] mx-auto md:flex-row md:justify-evenly">
         <div className="w-9 h-9 hidden md:block">
            <Avatar sx={{width: '100%', height: '100%', bgcolor: '#70709e'}} src={user?.photoURL ? user.photoURL : undefined}>{ user?.displayName ? user.displayName[0] : 'A' }</Avatar>
         </div>
         <textarea
            className="relative w-full max-w-[380px] h-24 border-2 border-gray-400 px-3 py-2 resize-none scroll-w-0 rounded-md"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
         />
         <div className="flex items-center justify-between md:items-start">
            <div className="w-8 h-8 md:hidden">
               <Avatar sx={{width: '100%', height: '100%', bgcolor: '#70709e'}} src={user?.photoURL ? user.photoURL : undefined}>{ user?.displayName ? user.displayName[0] : 'A' }</Avatar>
            </div>
            <LoadingBtn 
               variant="contained" 
               onClick={addComment}
               sx={{bgcolor: '#6D6D86', paddingX: '20px', paddingY: '5px'}}
               text="Add"
               loading={loading}
            />
         </div>
      </div> : <div className="flex justify-center">
         <Link to="/login" className="text-blue-700">Login to post comment</Link>
      </div>
   )
}
