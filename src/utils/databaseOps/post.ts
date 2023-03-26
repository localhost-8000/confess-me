import { equalTo, get, limitToLast, orderByChild, query, ref } from "firebase/database";
import { useDatabase } from "~/lib/firebase";
import { Post } from "~/types/post";
import { College } from "../CollegeData";

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

export const searchPosts = async (college: College | null): Promise<Post[]> => {
   const db = useDatabase();
   const fetchQuery = college ? query(ref(db, 'posts'), orderByChild('collegeData/name'), equalTo(college.name)) : ref(db, 'posts')
   
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

   return promiseRes;
}