import { AddOrUpdateFlag } from '~/types/extra';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FilterOption } from '~/types/filter';
import { Post } from '~/types/post';
import { getAllPosts } from '~/utils/firebaseUtils/postUtil';

import { useAnalytics } from '~/lib/firebase';
import { logEvent } from 'firebase/analytics';

import CreatePost from '../shared/CreatePost';
import Filter from '../shared/Filter';
import Footer from '../shared/Footer';
import NavBar from '../shared/NavBar';
import PostCard from '../shared/PostCard';
import ShortLoading from '../shared/ShortLoading';
import FeedTab from '~/layouts/tabs/FeedTab';

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
   const [loading, setLoading] = useState<boolean>(false);
   const [filterOptions, setFilterOptions] = useState<FilterOption>({
      college: null,
      sortBy: 'none'
   });

   const filteredPosts = useMemo(() => {
      setLoading(true);
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
      setLoading(false);
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
            setLoading(true);
            getAllPosts().then(posts => {
               setPosts(sortByMostRecent(posts));
            });
         } catch (err) {
            dispatch({type: "SNACKBAR", payload: {open: true, message: "Something went wrong", severity: "error"}});
            setLoading(false);
         }
      }
      fetchPosts();
   }, []);

   useEffect(() => {
      if(posts.length !== 0) setLoading(false);
   }, [posts]);

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

         {/* <Filter applyFilterOnPostsCB={filterOptionHandler} filterOptions={filterOptions} /> */}

         <div className="max-w-[1200px] mx-auto bg-[#333346] rounded-xl mt-8 h-fit max-h-[calc(100vh-6.75rem)]">
            {/* <div className="w-[100%] flex flex-col items-center"> */}
               {/* <CreatePost addPostCB={addOrUpdatePost}/> */}
               <FeedTab />

               {/* { loading ? <ShortLoading loading={loading} /> : 
                  filteredPosts.map(post => (
                     <PostCard key={post.id} post={post} updatePostCB={addOrUpdatePost}/>
                  ))
               }

               {!loading && <p className="text-white text-[18px] my-2">No more confessions🫡. Check back later!</p>} */}
            {/* </div> */}
         </div>
         <Footer />
      </>
   )
}
