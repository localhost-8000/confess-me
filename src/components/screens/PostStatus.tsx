import { LoadingButton } from '@mui/lab'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import React from 'react'
import { PostWithStatus } from '~/types/post'
import { snackBarDispatchMsg } from '~/utils/dispatchActionsUtil'
import { getPostStatus } from '~/utils/firebaseUtils/adminUtil'
import { AuthContext } from '../contexts/AuthContext'
import ExtraPageLayout from '../shared/ExtraPageLayout'
import PostStatusCard from '../shared/PostStatusCard'

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
      <ExtraPageLayout title="Check post status">
         <div className="w-full flex flex-col items-center">
            <Paper 
               elevation={3} 
               sx={{ maxWidth: 500, width: '100%', marginBottom: '18px', padding: '12px'}} 
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
               <LoadingButton 
                  disabled={statusId.length < 5}
                  variant="contained" 
                  loading={loading}
                  sx={{bgcolor: '#6D6D86', fontWeight: 'bold', marginTop: '12px'}}
                  onClick={findPostStatus}>
                     Find status
                  </LoadingButton>
            </Paper>
            {postStatus && <PostStatusCard post={postStatus} />}
         </div>
      </ExtraPageLayout>
   )
}
