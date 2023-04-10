import { onValue, ref } from "firebase/database";
import { useDatabase } from "~/lib/firebase";
import { Post } from "~/types/post";

// fetch post by id
export const getPostById = async (postId: string): Promise<Post | null> => {
   const db = useDatabase();
   const postRef = ref(db, `posts/${postId}`);

   let result: Post | null = null;

   await new Promise(resolve => {
      onValue(postRef, (snapshot) => {
         result = snapshot.val();
         resolve(result);
      }, { onlyOnce: true });
   });

   return result;
}