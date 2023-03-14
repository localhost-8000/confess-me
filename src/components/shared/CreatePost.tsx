import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import React from 'react'
import TextEditor from './TextEditor';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createNewPost } from '~/utils/firebaseUtils/postUtil';
import { colleges } from '~/utils/CollegeData';
import { EditorState, convertToRaw } from 'draft-js';
import { Paper } from '@mui/material'
import { Post } from '~/types/post';
import { AuthContext } from '../contexts/AuthContext';
import { AddOrUpdateFlag } from '~/types/extra';
import { validatePost } from '~/utils/postUtil';


interface CreatePostProps {
   addPostCB: (post: Post, flag: AddOrUpdateFlag) => void;
}

export default function CreatePost(props: CreatePostProps) {
   const { dispatch } = React.useContext(AuthContext);
   const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
   const [modalOpen, setModalOpen] = React.useState(false);

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
         dispatch({
            type: "SNACKBAR",
            payload: {
               open: true,
               message: errorMsg,
               severity: "error",
            }
         });
         return;
      }

      dispatch({type: "LOADING", payload: {loading: true}});

      createNewPost(post).then(val => {
         // props.addPostCB(val, "add");
         clearFields();
         dispatch({type: "LOADING", payload: {loading: false}});
         dispatch({
            type: "SNACKBAR",
            payload: {
               open: true,
               message: "Your confession has been sent for review. It will be posted once it is approved. The review process usually takes 10-20 minutes.",
               severity: "success",
            }
         })
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
            <Button variant="outlined" onClick={handleClickOpen} sx={{marginTop: '6px'}}>
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
            <Button color="info" variant="contained" sx={{marginRight: '8px'}} onClick={createPost}>
               Compose
            </Button>
            <Button color="warning" onClick={clearFields}>Clear</Button>
         </div>
    </Paper>    
  )
}
