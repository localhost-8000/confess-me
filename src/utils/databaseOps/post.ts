import { get, limitToLast, orderByChild, query, ref } from "firebase/database";
import { useDatabase } from "~/lib/firebase";
import { Post } from "~/types/post";

export const getTrendingPosts = async (): Promise<Post[]> => {
   const db = useDatabase();
   const fetchQuery = query(ref(db, 'posts'), orderByChild('likesCount'), limitToLast(60));
   
   const promiseRes: Post[] = await new Promise(resolve => {
      get(fetchQuery).then(snapshot => {
         const posts: Post[] = [];

         if(snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
               posts.push(childSnapshot.val());
            });
         }
         resolve(posts);
      });
   });

   return promiseRes.reverse();
}