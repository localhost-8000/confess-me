import { Post } from "~/types/post";
import { ref, set, push, onValue, query, orderByChild, runTransaction, equalTo } from "firebase/database";
import { useDatabase } from "~/lib/firebase";


export const createNewPost = async (newPost: Post) => {
   const db = useDatabase();
   const newPostKey = push(ref(db, 'posts')).key;
   newPost.id = newPostKey as string;
   newPost.createdAt = Date.now().toString();

   await new Promise(resolve => {
      set(ref(db, `posts/${newPostKey}`), newPost).then(() => {
         resolve('success');
      }).catch((error) => {
         console.error(error);
      });
   });

   return newPost;
}

// Get all the posts in order of most recent one
export const getAllPosts = async () => {
   const posts: Post[] = [];
   const db = useDatabase();
   const postsRef = query(ref(db, 'posts'), orderByChild('createdAt'));

   await new Promise(resolve => {
      onValue(postsRef, (snapshot) => {
         snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            posts.push(childData);
         });
         resolve(posts);
      }, { onlyOnce: true });
   });

   return posts.reverse();
}

// Like a post
export const togglePostLike = async (postId: string, userId: string) => {
   const db = useDatabase();
   const postRef = ref(db, `posts/${postId}`);

   let result: Post | string = "";

   await new Promise(resolve => {
      runTransaction(postRef, (post) => {
         if(post) {
            if(post.likes && post.likes[userId]) {
               post.likesCount--;
               post.likes[userId] = null;
            } else {
               post.likesCount++;
               if(!post.likes) {
                  post.likes = {};
               }
               post.likes[userId] = true;
            }
         }
         return post;
      }).then(val => {
         result = val.snapshot.val();
         resolve(result);
      }).catch(err => {
         result = "error";
         resolve(result);
      });
   });

   return result;
}

// search posts by college name and order by likes count
// if likes count is same then order by createdAt
export const searchPosts = async (collegeName: string) => {
   const posts: Post[] = [];
   const db = useDatabase();
   const postsRef = query(ref(db, 'posts'), orderByChild('collegeData/collegeName'), equalTo(collegeName));

   await new Promise(resolve => {
      onValue(postsRef, (snapshot) => {
         snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            posts.push(childData);
         });
         resolve(posts);
      }, { onlyOnce: true });
   });

   return posts.reverse();
}
