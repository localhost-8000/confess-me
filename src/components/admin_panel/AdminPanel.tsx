import AdminPostCard from '../shared/AdminPostCard';
import React from 'react'
import { getAdminPosts } from '~/utils/firebaseUtils/adminUtil';
import { Post } from '~/types/post';

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
      <div className="max-w-[calc(100vw-100px)] mx-auto bg-[#333346] rounded-xl mt-8 px-2 py-4 h-fit max-h-[calc(100vh-6.75rem)] overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-track-[#b0b0d4] scrollbar-thumb-[#3e3e50] scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
            <div className="w-[100%] flex flex-wrap">
               {posts.map(post => (
                  <AdminPostCard key={post.id} post={post} removePostCB={removePost}/>
               ))}
            </div>
               <p className="text-white text-[18px] my-2">No more confessions🫡. Check back later!</p>
         </div>
   )
}
