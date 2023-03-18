import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import React from 'react'
import { PostWithStatus } from '~/types/post'
import { getPostStatus } from '~/utils/firebaseUtils/adminUtil'
import ExtraPageLayout from '../shared/ExtraPageLayout'
import { LoadingButton } from '@mui/lab';
import { AuthContext } from '../contexts/AuthContext'
import { snackBarDispatchMsg } from '~/utils/dispatchActionsUtil'
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
      if (statusId.length !== 6) {
         dispatch(snackBarDispatchMsg('Invalid StatusID', 'error'));
         return;
      }
      setLoading(true);
      getPostStatus(statusId).then(res => {
         if(!res) {
            dispatch(snackBarDispatchMsg('Post not found', 'error'));
            setLoading(false);
            return;
         }
         console.log('client: ', res)
         setPostStatus(res);
      })
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
