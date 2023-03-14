import { onValue, orderByChild, push, query, ref, remove, set } from "firebase/database";
import { useDatabase } from "~/lib/firebase";
import { Post } from "~/types/post";

// Load posts to reviewed by admin
export const getAdminPosts = async () => {
   const posts: Post[] = [];
   const db = useDatabase();
   const postsRef = query(ref(db, 'adminPosts'), orderByChild('createdAt'));

   await new Promise(resolve => {
      onValue(postsRef, (snapshot) => {
         snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            posts.push(childData);
         });
         resolve(posts);
      }, { onlyOnce: true });
   });

   return posts;
}

// Approve a post and move to posts collection
export const approvePost = async (post: Post) => {
   const postId = post.id;
   const db = useDatabase();
   const postRef = ref(db, `adminPosts/${postId}`);
   const newPostRef = ref(db, `posts/${postId}`);

   await new Promise(resolve => {
      remove(postRef).then(() => {
         // const newPostKey = push(ref(db, 'posts')).key;
         set(newPostRef, post).then(() => {
            resolve('success');
         });
      });
   });

   return "success";
}

// reject a post
export const rejectPost = async (postId: string) => {
   const db = useDatabase();
   const postRef = ref(db, `adminPosts/${postId}`);

   await new Promise(resolve => {
      remove(postRef).then(() => {
         resolve('success');
      });
   });

   return "success";
}