import Footer from './Footer';
import MaxWidthContainerLayout from '~/layouts/MaxWidthContainerLayout';
import PostCard from './PostCard';
import React from 'react'
import ShortLoading from './ShortLoading';
import { AuthContext } from '../contexts/AuthContext';
import { base64Decode } from '@firebase/util'
import { getPostById } from '~/utils/firebaseUtils/postUtil';
import { Post } from '~/types/post';
import { setupFirebase } from '~/lib/firebase';
import { Link, useParams } from 'react-router-dom';
import { loadingMsg, snackBarDispatchMsg } from '~/utils/dispatchActionsUtil';
import ExtraPageLayout from './ExtraPageLayout';

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
      <ExtraPageLayout title={post?.collegeData?.name || "Checkout Post"}>
         <MaxWidthContainerLayout>
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
         </MaxWidthContainerLayout>
         
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
