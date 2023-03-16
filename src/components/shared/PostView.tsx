import Footer from './Footer';
import Link from '@mui/material/Link';
import MaxWidthContainerLayout from '~/layouts/MaxWidthContainerLayout';
import PostCard from './PostCard';
import React from 'react'
import ShortLoading from './ShortLoading';
import { AuthContext } from '../contexts/AuthContext';
import { base64Decode } from '@firebase/util'
import { getPostById } from '~/utils/firebaseUtils/postUtil';
import { Post } from '~/types/post';
import { setupFirebase } from '~/lib/firebase';
import { useParams } from 'react-router-dom';

export default function PostView() {
   const { id } = useParams<{ id: string }>();
   const { user, dispatch, loading } = React.useContext(AuthContext);
   const [post, setPost] = React.useState<Post | null>(null);

   React.useEffect(() => {
      const fetchPost = () => {
         if(!id) return;
         try {
            if(!user) setupFirebase();
            dispatch({type: "LOADING", payload: {loading: true}});
            const decodedPostId = base64Decode(id);
            if(!decodedPostId) return;
            getPostById(decodedPostId).then(res => {
               if(res) {
                  setPost(res);
               } else {
                  dispatch({type: "LOADING", payload: {loading: false}});
               }
            });
         } catch (err) {
            console.log(err);
            dispatch({type: "LOADING", payload: {loading: false}});
         }
      }
      fetchPost();
   }, [id, user]);

   React.useEffect(() => {
      if(!post) return;
      dispatch({type: "LOADING", payload: {loading: false}});
   }, [post]);

   return (
      <>
         <MaxWidthContainerLayout>
            {loading ? <ShortLoading /> : 
               <div className="w-[100%] flex flex-col items-center">
                  {post ? <PostCard post={post} /> 
                  : <PostNotFound />}
               </div>
            }
            { !user ? <div className="pt-2 text-white flex items-center justify-center">
               <Link href="/" sx={{fontSize: '18px', marginTop: '6px', color: 'inherit'}} underline='hover'>Login to see more such confessions🫡</Link>
            </div> : null
            }
         </MaxWidthContainerLayout>
         <Footer />
      </>
   )
}

const PostNotFound = () => {
   return (
      <div className="text-white flex flex-col items-center">
         <h3 className="text-2xl ">Post not found!! Recheck your URL.</h3>

         <Link href="/" sx={{fontSize: '18px', marginTop: '6px'}}>Go to Home</Link>
      </div>
   )
}
