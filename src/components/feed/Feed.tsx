import React from 'react'
import { Post } from '~/types/post';
import PostCard from '../shared/PostCard';
import ShortLoading from '../shared/ShortLoading';

interface FeedProps {
   posts: Post[];
   loading: boolean;
}

export default function Feed(props: FeedProps) {
   const { posts, loading } = props;

   return <>
      { loading ? <ShortLoading loading={loading} /> : 
         posts.map(post => (
            <PostCard key={post.id} post={post} />
      ))}

      {!loading && <p className="text-white text-[18px] my-2">No more confessions🫡. Check back later!</p>}
   </>
}
