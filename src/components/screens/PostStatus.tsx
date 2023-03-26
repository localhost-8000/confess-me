import { getPostStatus } from '~/utils/firebaseUtils/adminUtil';
import { snackBarDispatchMsg } from '~/utils/dispatchActionsUtil';

import { AuthContext } from '../contexts/AuthContext';
import { LoadingButton } from '@mui/lab';
import { PostWithStatus } from '~/types/post';

import ExtraPageLayout from '../shared/ExtraPageLayout';
import Paper from '@mui/material/Paper';
import PostStatusCard from '../shared/PostStatusCard';
import React from 'react';
import TextField from '@mui/material/TextField'
import LoadingBtn from '~/layouts/buttons/LoadingBtn';

export default function PostStatus() {
   const { dispatch } = React.useContext(AuthContext);
   const [statusId, setStatusId] = React.useState<string>('')
   const [loading, setLoading] = React.useState<boolean>(false);
   const [postStatus, setPostStatus] = React.useState<PostWithStatus | null>(null);

   React.useEffect(() => {
      if(postStatus) setLoading(false);
   }, [postStatus]);

   const findPostStatus = () => {
      setLoading(true);
      getPostStatus(statusId).then(res => {
         if(!res) {
            dispatch(snackBarDispatchMsg('Post not found!! Check if StatusID is correct.', 'error'));
            setLoading(false);
            return;
         }
        
         setPostStatus(res);
      }).catch(err => {
         dispatch(snackBarDispatchMsg('Error fetching post status! Check StatusID', 'error'));
         setLoading(false);
      });
   }

   return (
      <ExtraPageLayout title="Post status">
         <div className="w-full flex flex-col items-center">
            <Paper 
               elevation={3} 
               sx={{ maxWidth: 500, width: '100%', padding: '12px'}} 
               className="flex flex-col"
            >
               <TextField 
                  id="outlined-basic"
                  variant="outlined"
                  label="Enter StatusID"
                  sx={{marginBottom: '12px'}}
                  value={statusId}
                  onChange={e => setStatusId(e.target.value)}
               />
               <LoadingBtn 
                  loading={loading}
                  onClick={findPostStatus}
                  text="Find status"
                  sx={{bgcolor: '#6D6D86', fontWeight: 'bold', marginTop: '12px'}}
                  disabled={statusId.length < 5}
               />
            </Paper>
            {postStatus && <PostStatusCard post={postStatus} />}
         </div>
      </ExtraPageLayout>
   )
}
