import React from 'react';
import ExtraPageLayout from './ExtraPageLayout';
import PostCard from './PostCard';
import ShortLoading from './ShortLoading';

import { base64Decode } from '@firebase/util';
import { Link, useParams } from 'react-router-dom';
import { setupFirebase } from '~/lib/firebase';
import { Post } from '~/types/post';
import { loadingMsg, snackBarDispatchMsg } from '~/utils/dispatchActionsUtil';
import { getPostById } from '~/utils/firebaseUtils/postUtil';
import { AuthContext } from '../contexts/AuthContext';

export default function PostView() {
   const { id } = useParams<{ id: string }>();
   const { user, dispatch, loading } = React.useContext(AuthContext);
   const [post, setPost] = React.useState<Post | null>(null);

   React.useEffect(() => {
      const fetchPost = () => {
         if(!id) return;
         try {
            if(!user) setupFirebase();

            dispatch(loadingMsg(true));

            const decodedPostId = base64Decode(id);
            if(!decodedPostId) {
               dispatch(snackBarDispatchMsg('Invalid URL', 'error'));
               dispatch(loadingMsg(false));
               return;
            }

            getPostById(decodedPostId).then(res => {
               if(res) {
                  setPost(res);
               } else {
                  dispatch(loadingMsg(false));
               }
            });
         } catch (err) {
            console.log(err);
            dispatch(loadingMsg(false));
         }
      }
      fetchPost();
   }, [id, user]);

   React.useEffect(() => {
      if(!post) return;
      dispatch(loadingMsg(false));
   }, [post]);

   return (
      <ExtraPageLayout title={"Checkout Post"}>
            {loading ? <ShortLoading /> : 
               <div className="w-[100%] flex flex-col items-center">
                  {post ? <PostCard post={post} /> 
                  : <PostNotFound />}
               </div>
            }
            { !user ? <div className="pt-2 text-white flex items-center justify-center">
               
               <Link to="/" className="text-[18px] mt-2 text-inherit">Login to see more such confessions🫡</Link>
               </div> : null
            }
      </ExtraPageLayout>
   )
}

const PostNotFound = () => {
   return (
      <div className="text-white flex flex-col items-center">
         <h3 className="text-2xl ">Post not found!! Recheck your URL.</h3>

         <Link to="/" className="text-[18px] mt-2">Go to Home</Link>
      </div>
   )
}
