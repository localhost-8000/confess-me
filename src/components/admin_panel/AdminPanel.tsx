import { getAdminPosts } from '~/utils/firebaseUtils/adminUtil';
import { Post } from '~/types/post';

import AccordianWrapper from '~/layouts/AccordianWrapper';
import AdminPostCard from '../shared/AdminPostCard';
import CreateConfession from '../post/CreateConfession';
import MaxWidthContainerLayout from '~/layouts/MaxWidthContainerLayout';
import React from 'react';


export default function AdminPanel() {
   const [posts, setPosts] = React.useState<Post[]>([]);

   React.useEffect(() => {
      const fetchAdminPosts = () => {
         try {
            getAdminPosts().then(posts => {
               setPosts(posts);
            })
         } catch (err) {
            console.log(err);
         }
      }
      fetchAdminPosts();
   }, []);

   const removePost = (id: Post['id']) => {
      setPosts(posts.filter(post => post.id !== id));
   }

   return (
      <MaxWidthContainerLayout>
         <h1 className="text-white text-[24px] text-center">Admin Panel</h1>
         <AccordianWrapper title="Create post">
            <CreateConfession isAdmin={true} />
         </AccordianWrapper>

         <div className="w-[100%] flex flex-wrap">
            {posts.map(post => (
               <AdminPostCard key={post.id} post={post} removePostCB={removePost}/>
            ))}
         </div>
            <p className="text-white text-[18px] my-2">No more confessions🫡. Check back later!</p>

      </MaxWidthContainerLayout>
   )
}
