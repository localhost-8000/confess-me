import { getTrendingPosts } from '~/utils/databaseOps/post';
import { snackBarDispatchMsg } from '~/utils/dispatchActionsUtil';
import { useContext, useEffect, useState} from 'react'

import { AuthContext } from '../contexts/AuthContext';
import { Post } from '~/types/post';

import Feed from './Feed';


export default function TrendingFeed() {
   const { dispatch } = useContext(AuthContext);
   const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      const fetchTrendingPosts = () => {
         try {
            setLoading(true);
            getTrendingPosts().then(posts => {
               setTrendingPosts(posts);
               setLoading(false);
            });
         } catch (err) {
            dispatch(snackBarDispatchMsg("Something went wrong. Please try again later.", "error"));
            setLoading(false);
         }
      }
      fetchTrendingPosts();
   }, []);

   useEffect(() => {
      if(trendingPosts.length !== 0) setLoading(false);
   }, [trendingPosts]);

   return (
      <Feed posts={trendingPosts} loading={loading} />
   )
}
