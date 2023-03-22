import { AuthContext } from '../contexts/AuthContext';
import { PostComment } from '~/types/post';

import { onValue, ref } from 'firebase/database';
import { useDatabase } from '~/lib/firebase';
import { sortByMostRecent } from '~/utils/postUtil';

import AddComment from './AddComment';
import CommentCard from './CommentCard';
import React from 'react'


interface CommentProps {
   postId: string | undefined;
   handleCloseCommentsCB: () => void;
}

export default function Comment(props: CommentProps) {
   const [comments, setComments] = React.useState<PostComment[]>([]);

   const recentComments = React.useMemo(() => {
      
      return comments.sort((a, b) => sortByMostRecent(a.createdAt, b.createdAt));
   }, [comments]);

   React.useEffect(() => {
      const db = useDatabase();
      let commentsRef = ref(db, `post-comments/${props.postId}`);
      
      return onValue(commentsRef, snapshot => {
         if(snapshot.exists()) {
            const newComments: PostComment[] = Object.values(snapshot.val());
            const len = comments.length;
            const newLen = newComments.length;

            if(len === newLen) return;

            if(comments.length === 0) {
               setComments(newComments);
               return;
            }

            setComments(prev => {
               if(newLen > 1) return [...prev, newComments[newLen - 1]];
               return newComments;
            });
         }
      });
   }, []);

   return (
      <div className="py-1 mt-2">
         <AddComment postId={props.postId} />

         <div className="pl-4 pt-2">
            { recentComments.map(comment => <CommentCard key={comment.id} comment={comment} />) }
         </div>
         <p className="text-sm text-[#424257] text-center mt-4">
            {comments.length ? "No more comments..." : "No comments yet..."}
            {comments.length ? <button className="text-[#3b82f6] cursor-pointer pl-1" onClick={props.handleCloseCommentsCB}>Close</button> : null}
         </p>
      </div>
   )
}
