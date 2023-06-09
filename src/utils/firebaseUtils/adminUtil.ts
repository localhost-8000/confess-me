import { equalTo, get, limitToFirst, onValue, orderByChild, query, ref, remove, set, update } from "firebase/database";
import { useDatabase } from "~/lib/firebase";
import { Post, PostWithStatus } from "~/types/post";
import { generateDecodedPostId } from "../postUtil";
import { getPostById } from "./common";

// Load posts to reviewed by admin
export const getAdminPosts = async () => {
   const posts: Post[] = [];
   const db = useDatabase();
   const postsRef = query(ref(db, 'adminPosts'), orderByChild('status'), equalTo('pending'));

   await new Promise(resolve => {
      onValue(postsRef, (snapshot) => {
         snapshot.forEach(childSnapshot => {
            const childData: PostWithStatus = childSnapshot.val();
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
         const newPost: Post = {
            id: post.id,
            collegeData: post.collegeData,
            confession: post.confession,
            createdAt: post.createdAt,
            likesCount: 0,
            reportCounts: 0,
         };
         if(post.tags) newPost.tags = post.tags;
         if(post.isAdmin) newPost.isAdmin = true;

         set(newPostRef, newPost).then(() => {
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
      update(postRef, { status: "rejected" }).then(() => {
         resolve('success');
      });
   });

   return "success";
}

// Find status of a post
export const getPostStatus = async (statusId: string): Promise<PostWithStatus | null> => {
   const db = useDatabase();

   const findPostQuery = query(ref(db, 'adminPosts'), orderByChild('statusId'), equalTo(statusId), limitToFirst(1));
   
   let postWithStatus: PostWithStatus | null = null;

   const status = await new Promise(resolve => {
      get(findPostQuery).then((snapshot) => {
         if(snapshot.exists()) {
            snapshot.forEach(child => {
               postWithStatus = child.val();
               resolve(postWithStatus);
            });
         } else {
            resolve(null);
         }
      });
   });

   if(status === null) {
      const postId = generateDecodedPostId(statusId);
      if(postId === null) return null;

      const post = await getPostById(postId);
      
      if(post !== null) {
         postWithStatus = {
            ...post,
            status: "approved",
            statusId
         }
      }
   } 

   return postWithStatus;
}