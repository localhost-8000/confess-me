import { Post, PostWithStatus, TextModerationResult, TextModerationReturnType } from "~/types/post";
import { 
   endBefore,
   equalTo,
   limitToLast,
   onValue, 
   orderByChild, 
   push, 
   query, 
   ref, 
   runTransaction, 
   set} from "firebase/database";
import { useDatabase } from "~/lib/firebase";
import { generateEncodedStatusId, generateViolatingMessage } from "../postUtil";
import { College } from "../CollegeData";
import { approvePost } from "./adminUtil";


export const createNewPost = async (collegeData: College, confession: string, isAdmin?: boolean) => {
   const db = useDatabase();
   const newPostKey = push(ref(db, 'adminPosts')).key;

   const postToBeModerated: PostWithStatus = {
      collegeData: collegeData,
      confession: confession,
      likesCount: 0,
      id: newPostKey as string,
      createdAt: Date.now().toString(),
      statusId: isAdmin ? "" : generateEncodedStatusId(newPostKey as string),
      status: "pending",
      commentsCount: 0,
   }

   if(isAdmin) {
      postToBeModerated.isAdmin = true;
      return approvePost(postToBeModerated);
   }

   await new Promise(resolve => {
      set(ref(db, `adminPosts/${newPostKey}`), postToBeModerated).then(() => {
         resolve('success');
      }).catch((error) => {
         console.error(error);
      });
   });

   return postToBeModerated;
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

export const reportPost = async (postId: string, userId: string) => {
   const db = useDatabase();
   const postRef = ref(db, `posts/${postId}`);

   let result: string | null = null;

   await new Promise(resolve => {
      runTransaction(postRef, (post) => {
         if(post) {
            if(post.reports && post.reports[userId]) {
               result = "already_reported";
            } else {
               if(!post.reportCounts) post.reportCounts = 0;
               post.reportCounts++;
               if(!post.reports) post.reports = {};
               post.reports[userId] = true;
               result = "success";
            }
         }
         return post;
      }).then(_ => {
         resolve(result);
      }).catch(_ => {
         result = "error";
         resolve(result);
      });
   });

   return result;
}

// Run test moderation api to check if the post contains any inappropriate content
export const testModeration = async (confession: string): Promise<TextModerationReturnType> => {
   if(import.meta.env.VITE_PROCESS_ENV === "development") return {isViolatingContent: false, message: ""};

   const openAIAPIKey = import.meta.env.VITE_OPENAI_API_KEY;
   const openAIUrl = "https://api.openai.com/v1/moderations";

   const promise: TextModerationReturnType = await new Promise(resolve => {
      fetch(openAIUrl, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openAIAPIKey}`
         },
         body: JSON.stringify({input: confession})
      })
      .then(res => res.json())
      .then(data => {
         const isViolatingContent = data.results[0].flagged;
         if(isViolatingContent) {
            const moderationResult: TextModerationResult = data.results[0].categories;
            const message = generateViolatingMessage(moderationResult);
            resolve({isViolatingContent, message});
         } else {
            resolve({isViolatingContent, message: ""});
         }
      })
      .catch(err => {
         console.log('error')
         resolve({isViolatingContent: false, message: err.message, error: true})
      });
   });
   
   return promise;
}

export const getPaginatedPosts = async (limit: number, lastKey: string): Promise<Post[]> => {
   const posts: Post[] = [];
   const db = useDatabase();
   const postsRef = query(ref(db, 'posts'), orderByChild('createdAt'), endBefore(lastKey), limitToLast(limit));

   const result: Post[] = await new Promise(resolve => {
      onValue(postsRef, (snapshot) => {
         snapshot.forEach(childSnapshot => {
            posts.push(childSnapshot.val());
         });
         resolve(posts);
      }, { onlyOnce: true });
   });

   return result.reverse();
}