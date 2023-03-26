import { logEvent } from 'firebase/analytics';
import { useContext, useEffect, useState} from 'react'
import { useAnalytics } from '~/lib/firebase';
import { AddOrUpdateFlag } from '~/types/extra';
import { Post } from '~/types/post';
import { snackBarDispatchMsg } from '~/utils/dispatchActionsUtil';
import { getAllPosts } from '~/utils/firebaseUtils/postUtil';
import { sortByMostRecent } from '~/utils/postUtil';
import { AuthContext } from '../contexts/AuthContext';
import PostCard from '../shared/PostCard';
import ShortLoading from '../shared/ShortLoading';
import Feed from './Feed';

export default function HomeFeed() {
   const { dispatch } = useContext(AuthContext);
   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      const analytics = useAnalytics();
      logEvent(analytics, "normal_feed", {
         name: "normal_feed",
      });
   }, []);

   useEffect(() => {
      const fetchPosts = () => {
         try {
            setLoading(true);
            getAllPosts().then(newPosts => {
               const sortedPosts = newPosts.sort((a, b) => sortByMostRecent(a.createdAt as string, b.createdAt as string));
               setPosts(sortedPosts);
            });
         } catch (err) {
            dispatch(snackBarDispatchMsg("Something went wrong. Please try again later.", "error"));
            setLoading(false);
         }
      }
      fetchPosts();
   }, []);

   useEffect(() => {
      if(posts.length !== 0) setLoading(false);
   }, [posts]);

   return (
      <Feed loading={loading} posts={posts} />
   )
}
