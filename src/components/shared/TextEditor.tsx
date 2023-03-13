import React from 'react'
import {Editor, EditorState, RichUtils} from 'draft-js'
import 'draft-js/dist/Draft.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface TextEditorProps {
   editorState: EditorState;
   onChangeCB: (editorState: EditorState) => void;
   modalOpen: boolean;
   handleModalCloseCB: () => void;
   saveConfessionCB: () => void;
}

export default function TextEditor(props: TextEditorProps) {
   const {editorState, onChangeCB, modalOpen, handleModalCloseCB, saveConfessionCB} = props;

   const handleKeyCommand = (command: string, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(
         editorState,
         command
      );
      if (newState) {
         onChangeCB(newState);
         return 'handled';
      }
      return 'not-handled';
   }
   
   return (
      <Dialog open={modalOpen} onClose={handleModalCloseCB}>
         <DialogTitle>Write your confession</DialogTitle>
         <DialogContent>
            <DialogContentText>
               Don't use any profanity or hate speech. We will remove your post if you do.
               You can use <b>ctrl + b</b>, <i>ctrl + i</i>, <u>ctrl + u</u> to bold, italicize, and underline text. <i>We think 500 words are enough to express your feelings</i>.
            </DialogContentText>
            <div className="border-[2px] rounded-md border-gray-300 px-2 py-3 mt-2 min-h-[100px]">
               <Editor 
                  editorState={editorState} 
                  handleKeyCommand={handleKeyCommand}
                  onChange={onChangeCB} 
                  placeholder="Write your confession here"
               />
            </div>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleModalCloseCB} color="warning" sx={{marginRight: '8px'}}>Cancel</Button>
            <Button onClick={saveConfessionCB} color="success" variant="contained">
               Save
            </Button>
        </DialogActions>
      </Dialog>
   )
}
