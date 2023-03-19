import { AddOrUpdateFlag } from '~/types/extra';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FilterOption } from '~/types/filter';
import { Post } from '~/types/post';
import { getAllPosts } from '~/utils/firebaseUtils/postUtil';

import CreatePost from '../shared/CreatePost';
import Filter from '../shared/Filter';
import Footer from '../shared/Footer';
import Loading from '../shared/Loading';
import NavBar from '../shared/NavBar';
import PostCard from '../shared/PostCard';
import { useAnalytics } from '~/lib/firebase';
import { logEvent } from 'firebase/analytics';

function sortByMostRecent(posts: Post[]) {
   return posts.sort((a, b) => {
     // Convert the timestamps to Date objects for comparison.
     const dateA: number = new Date(a.createdAt as string).getTime();
     const dateB: number = new Date(b.createdAt as string).getTime();
 
     // Sort in descending order (most recent first)
     return dateB.valueOf() - dateA.valueOf();
   });
 }
 

export default function HomePage() {
   const { dispatch } = useContext(AuthContext);
   const [posts, setPosts] = useState<Post[]>([]);
   const [filterOptions, setFilterOptions] = useState<FilterOption>({
      college: null,
      sortBy: 'none'
   });

   const filteredPosts = useMemo(() => {
      const { college, sortBy } = filterOptions;
      let filteredPosts = [...posts];

      if (college) {
         filteredPosts = filteredPosts.filter(post => post.collegeData?.name === college.name);
      }
      if (sortBy === 'most_recent') {
         filteredPosts = sortByMostRecent(filteredPosts);
      }
      if(sortBy === 'most_liked') {
         filteredPosts = filteredPosts.sort((a, b) => b.likesCount - a.likesCount);
      }

      return filteredPosts;
   }, [posts, filterOptions]);

   useEffect(() => {
      const analytics = useAnalytics();
      logEvent(analytics, "page_view", {
         page_title: "Home",
         page_location: window.location.href,
         page_path: "/home"
      });
   }, []);

   useEffect(() => {
      const fetchPosts = () => {
         try {
            dispatch({type: "LOADING", payload: {loading: true}});
            getAllPosts().then(posts => {
               setPosts(sortByMostRecent(posts));
               dispatch({type: "LOADING", payload: {loading: false}});
            });
         } catch (err) {
            dispatch({type: "SNACKBAR", payload: {open: true, message: "Something went wrong", severity: "error"}});
         } finally {
            dispatch({type: "LOADING", payload: {loading: false}});
         }
      }
      fetchPosts();
   }, []);

   const addOrUpdatePost = (updatedPost: Post, flag: AddOrUpdateFlag) => {
      if(flag === "add") 
         setPosts([updatedPost, ...posts]);
      
      if(flag === "update")
         setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
   }  
   
   const filterOptionHandler = (filterOptions: FilterOption) => {
      setFilterOptions(filterOptions);
   }

   return (
      <>
         <NavBar />
         <Filter applyFilterOnPostsCB={filterOptionHandler} filterOptions={filterOptions} />
         <div className="max-w-[1200px] mx-auto bg-[#333346] rounded-xl mt-8 px-2 py-4 h-fit max-h-[calc(100vh-6.75rem)] overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-track-[#b0b0d4] scrollbar-thumb-[#3e3e50] scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
            <div className="w-[100%] flex flex-col items-center">
               <CreatePost addPostCB={addOrUpdatePost}/>
               {filteredPosts.map(post => (
                  <PostCard key={post.id} post={post} updatePostCB={addOrUpdatePost}/>
               ))}
               <p className="text-white text-[18px] my-2">No more confessions🫡. Check back later!</p>
            </div>
         </div>
         <Footer />
         <Loading />
      </>
   )
}
