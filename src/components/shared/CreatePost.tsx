import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import React from 'react'
import TextEditor from './TextEditor';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createNewPost, testModeration } from '~/utils/firebaseUtils/postUtil';
import { colleges } from '~/utils/CollegeData';
import { EditorState, convertToRaw } from 'draft-js';
import { Paper } from '@mui/material'
import { Post } from '~/types/post';
import { AuthContext } from '../contexts/AuthContext';
import { AddOrUpdateFlag } from '~/types/extra';
import { validatePost } from '~/utils/postUtil';
import { loadingMsg, snackBarDispatchMsg } from '~/utils/dispatchActionsUtil';
import { LoadingButton } from '@mui/lab';


interface CreatePostProps {
   addPostCB: (post: Post, flag: AddOrUpdateFlag) => void;
}

export default function CreatePost(props: CreatePostProps) {
   const { dispatch } = React.useContext(AuthContext);
   const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
   const [modalOpen, setModalOpen] = React.useState(false);
   const [loading, setLoading] = React.useState(false);

   const [post, setPost] = React.useState<Post>({
      collegeData: null,
      confession: '',
      likesCount: 0,
   });
   const [previewConfession, setPreviewConfession] = React.useState<string>('');

   const onChange = (editorState: EditorState) => {
      setEditorState(editorState);
   }

   const saveConfession = () => {
      handleModalClose();

      if(editorState.getCurrentContent().isEmpty()) return;

      const rawContent = convertToRaw(editorState.getCurrentContent());
      const confessionString = JSON.stringify(rawContent);  
      setPreviewConfession(editorState.getCurrentContent().getPlainText().substring(0, 30));

      setPost({
         ...post,
         confession: confessionString,
      });
   }

   const handleClickOpen = () => { setModalOpen(true) };
   const handleModalClose = () => { setModalOpen(false) };

   const createPost = () => {
      const errorMsg = validatePost(post.collegeData, post.confession);

      if(errorMsg) {
         dispatch(snackBarDispatchMsg(errorMsg, "error"));
         return;
      }
      setLoading(true);
      testModeration(post.confession).then(val => {
         if(val.error || val.isViolatingContent) {
            let msg = val.isViolatingContent ? (val.message || "Your confession contains some inappropriate content. Please remove it and try again") : "Something went wrong. Please try again later";
            dispatch(snackBarDispatchMsg(msg, "error"));
            setLoading(false);
            return;
         }

         createNewPost(post).then(val => {
            // props.addPostCB(val, "add");
            clearFields();
            
            // copy statusId to clipboard
            window.navigator.clipboard.writeText(val.statusId).then(() => {
               const msg = `Thank you for submitting your confession! Your post is currently being reviewed by our team. StatusID: ${val.statusId}. Please use this ID to check the status of your post. It's also copied to your clipboard. Please save it for future reference.`;
   
               dispatch(snackBarDispatchMsg(msg, "success"));
               setLoading(false);
            });
         });
      });
   }

   const clearFields = () => {
      setPost({
         collegeData: null,
         confession: '',
         likesCount: 0,
      });
      setEditorState(EditorState.createEmpty());
      setPreviewConfession('');
   }

  return (
      <Paper elevation={3} sx={{ maxWidth: 600, width: '100%', marginBottom: '18px', padding: '12px'}}>
         <Typography variant="h5" sx={{fontWeight: 'bold', marginY: '4px'}}>Compose your confession</Typography>
         <Autocomplete
            disablePortal
            value={post.collegeData}
            onChange={(_, newValue) => {
               setPost({
                  ...post,
                  collegeData: newValue,
               });
            }}
            id="select-college"
            options={colleges}
            sx={{ width: '100%', marginY: '10px' }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Select College" />} 
         />
         <div className="flex items-center">
            <Button variant="outlined" onClick={handleClickOpen} sx={{marginTop: '6px', color: '#333346', fontWeight: 'bold', border: '1px solid #6D6D86'}}>
               Start Writing
            </Button>

            {previewConfession ? 
               <div className="ml-4 text-[17px] border-b-2 px-2 border-b-blue-600">
                  {previewConfession}...
               </div>
               : null
            }
         </div>

         <TextEditor 
            editorState={editorState} 
            onChangeCB={onChange} 
            modalOpen={modalOpen} 
            handleModalCloseCB={handleModalClose} 
            saveConfessionCB={saveConfession}
         />
         <div className="flex mt-4 items-center justify-end">
            <LoadingButton 
               color="info" 
               loading={loading}
               variant="contained" 
               sx={{marginRight: '8px', bgcolor: '#6D6D86', fontWeight: 'bold'}} 
               onClick={createPost}>
               Compose
            </LoadingButton>
            <Button color="warning" onClick={clearFields}>Clear</Button>
         </div>
    </Paper>    
  )
}
