import { increment, push, ref, update } from "firebase/database";
import { useDatabase } from "~/lib/firebase";


// add comment on a post
export const addCommentToPost = async (
   postId: string, comment: string, authorName: string, authorPhotoUrl: string): Promise<"success" | "error"> => {
   const db = useDatabase();
   const newCommentKey = push(ref(db, `post-comments/${postId}`)).key;
   const updates: {[key: string]: any} = {};

   updates[`posts/${postId}/commentsCount`] = increment(1);
   updates[`post-comments/${postId}/${newCommentKey}`] = {
      id: newCommentKey,
      comment,
      authorName,
      authorPhotoUrl,
      createdAt: Date.now().toString(),
   }

   let result: 'success' | 'error' = 'success';

   await new Promise(resolve => {
      update(ref(db), updates).then(() => {
         resolve('success');
      }).catch((error) => {
         result = 'error';
      });
   });

   return result;
}