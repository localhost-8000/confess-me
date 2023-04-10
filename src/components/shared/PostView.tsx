import { AuthContext } from '../contexts/AuthContext';
import { Link, useParams } from 'react-router-dom';
import { Post } from '~/types/post';

import { base64Decode } from '@firebase/util';
import { getPostById } from '~/utils/firebaseUtils/common';
import { setupFirebase } from '~/lib/firebase';
import { snackBarDispatchMsg } from '~/utils/dispatchActionsUtil';

import React from 'react';
import ExtraPageLayout from './ExtraPageLayout';
import PostCard from './PostCard';
import ShortLoading from './ShortLoading';


export default function PostView() {
   const { id } = useParams<{ id: string }>();
   const { user, dispatch } = React.useContext(AuthContext);
   const [post, setPost] = React.useState<Post | null>(null);
   const [loading, setLoading] = React.useState<boolean>(false);

   React.useEffect(() => {
      const fetchPost = () => {
         if(!id) return;
         try {
            if(!user) setupFirebase();
            setLoading(true);

            const decodedPostId = base64Decode(id);
            if(!decodedPostId) {
               dispatch(snackBarDispatchMsg('Invalid URL', 'error'));
               setLoading(false);
               return;
            }

            getPostById(decodedPostId).then(res => {
               if(res) {
                  setPost(res);
               } else {
                  setLoading(false);
               }
            });
         } catch (err) {
            dispatch(snackBarDispatchMsg("Something went wrong", "error"));
            setLoading(false);
         }
      }
      fetchPost();
   }, [id, user]);

   React.useEffect(() => {
      if(!post) return;
      setLoading(false);
   }, [post]);

   return (
      <ExtraPageLayout title={"Checkout Post"}>
            {loading ? <ShortLoading loading={loading} /> : 
               <div className="w-[100%] flex flex-col items-center">
                  {post ? <PostCard post={post} /> 
                  : <PostNotFound />}
               </div>
            }
            <div className="pt-2 text-white flex items-center justify-center">
               <Link to="/" className="text-[18px] mt-2 text-inherit underline text-blue-400">See more such amazing confessions🫡</Link>
            </div>
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
