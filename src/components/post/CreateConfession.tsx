import { convertToRaw, Editor, EditorState } from 'draft-js';
import { createNewPost, testModeration } from '~/utils/firebaseUtils/postUtil';
import { logEvent } from 'firebase/analytics';
import { snackBarDispatchMsg } from '~/utils/dispatchActionsUtil';
import { useAnalytics } from '~/lib/firebase';
import { useContext, useRef, useState } from 'react';
import { validatePost } from '~/utils/postUtil';

import { AuthContext } from '../contexts/AuthContext';
import { College } from '~/utils/CollegeData';
import {TextEditor} from './TextEditor';
import { Paper } from '@mui/material';

import AutoCompleteWrapper from '~/layouts/textfield/AutoCompleteWrapper';
import LoadingBtn from '~/layouts/buttons/LoadingBtn';
import MaxWidthModal from '~/layouts/modals/MaxWidthModal';
import TextBtn from '~/layouts/buttons/TextBtn';

export default function CreateConfession(props: {isAdmin?: boolean}) {
   const { dispatch } = useContext(AuthContext);

   const analytics = useAnalytics();
   const editorRef = useRef<Editor>(null);
   const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
   const [infoModalOpen, setInfoModalOpen] = useState<InfoModal>({
      open: false,
      statusId: '',
   });
   const [loading, setLoading] = useState<boolean>(false);
   const [post, setPost] = useState<MinPost>({
      collegeData: null,
      confession: '',
   });

   const changeEditorState = (editorState: EditorState) => {
      setEditorState(editorState);
      const rawContent = convertToRaw(editorState.getCurrentContent());
      setPost({
         ...post,
         confession: JSON.stringify(rawContent)
      });
   }

   const createConfession = () => {
      const errorMsg = validatePost(post.collegeData, post.confession);

      if(errorMsg) {
         dispatch(snackBarDispatchMsg(errorMsg, "error"));
         return;
      }
      setLoading(true);

      if(props.isAdmin) {
         createNewPost(post.collegeData as College, post.confession, true).then(val => {
            setLoading(false);
            clearFields();
            if(typeof val === "string") {
               alert("post created.");
            }
         });
         return;
      }
      testModeration(post.confession).then(val => {
         if(val.isViolatingContent) {
            let msg = val.message || "Your post contains inappropriate content.";
            dispatch(snackBarDispatchMsg(msg, "error"));
            setLoading(false);
            return;
         }

         createNewPost(post.collegeData as College, post.confession).then(val => {
            if(typeof val === "string") return;
            clearFields();

            logEvent(analytics, "create_post", {
               college: val.collegeData?.name
            });

            setInfoModalOpen({
               open: true,
               statusId: val.statusId
            });
            setLoading(false);
         });
      });
   }

   const clearFields = () => {
      setPost({
         collegeData: null,
         confession: '',
      });
      setEditorState(EditorState.createEmpty());
   }

   const setEditorFocus = () => {
      editorRef.current?.focus();
   }

   return (
      <Paper elevation={2} className="w-full max-w-[600px] p-4">
         <AutoCompleteWrapper 
            value={post.collegeData}
            onChangeCB={(_, newValue) => setPost({...post, collegeData: newValue})}
         />
         <span className="font-bold">Write your confession:</span>
         <p>
            Don't use any profanity or hate speech. Such posts won't be approved. You can include references of the person you want to confess to.<br />
            Use <b>ctrl + b</b>, <i>ctrl + i</i>, <u>ctrl + u</u> to bold, italicize, and underline text.
         </p>
         <div className="border-[2px] rounded-md border-[#606079] px-2 py-3 mt-2 min-h-[150px] hover:cursor-text" id="editor-wrapper" onClick={setEditorFocus}>
            <TextEditor 
               editorState={editorState}
               onChangeCB={changeEditorState}
               ref={editorRef}
            />
         </div>

         <div className="flex mt-4 items-center justify-end">
            <LoadingBtn 
               loading={loading}
               onClick={createConfession}
               text="Compose"
               sx={{marginRight: '8px', bgcolor: '#6D6D86', fontWeight: 'bold'}}
               color="info"
            />
            <TextBtn color="warning" onClickCB={clearFields} text="Clear" />
         </div>

         <MaxWidthModal 
            title="Your post is submitted." 
            open={infoModalOpen.open} 
            handleCloseCB={() => setInfoModalOpen({open: false, statusId: ''})}
         >
            Thank you for submitting your confession! Your post is currently being reviewed by our team. 
            <br /><br /> <b>Status ID: { infoModalOpen.statusId }</b><br /> <br />Please use this ID to check the status of your post. Please save it for future reference.
         </MaxWidthModal>
      </Paper>
   )
}

type InfoModal = {
   open: boolean;
   statusId: string;
}

type MinPost = {
   collegeData: College | null;
   confession: string;
}
