import * as React from 'react';
// import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { useEffect } from 'react';
import TabPanel from './TabPanel';
import TabIcons from './TabIcons';
import HomeFeed from '~/components/feed/HomeFeed';
import TrendingFeed from '~/components/feed/TrendingFeed';
import { getTrendingPosts } from '~/utils/databaseOps/post';
import { Post } from '~/types/post';
import CreatePost from '~/components/shared/CreatePost';
import CreateConfession from '~/components/post/CreateConfession';

export default function FeedTab() {
   const theme = useTheme();
   const [value, setValue] = React.useState(0);
   const [trendingPosts, setTrendingPosts] = React.useState<Post[]>([]);

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   useEffect(() => {
      // const fetchTrendingPosts = () => {
      //    getTrendingPosts().then(posts => {
      //       setTrendingPosts(posts);
      //    });
      // }
      // fetchTrendingPosts();
   }, []);


   return <>
      <AppBar position="sticky" sx={{ bgcolor: '#71718c', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
         <TabIcons value={value} handleChangeCB={handleChange} />
      </AppBar>
      
      <TabPanel value={value} index={0} dir={theme.direction}>
         <HomeFeed />
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
         <TrendingFeed />
      </TabPanel>

      <TabPanel value={value} index={2} dir={theme.direction}>
         <CreateConfession />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
         Item Three
      </TabPanel>
   </>
}

