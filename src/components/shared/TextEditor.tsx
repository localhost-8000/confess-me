import React from 'react'
import {Editor, EditorState, RichUtils} from 'draft-js'
import 'draft-js/dist/Draft.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface TextEditorProps {
   editorState: EditorState;
   modalOpen: boolean;
   onChangeCB: (editorState: EditorState) => void;
   handleModalCloseCB: () => void;
   saveConfessionCB: () => void;
}

export default function TextEditor(props: TextEditorProps) {
   const {editorState, onChangeCB, modalOpen, handleModalCloseCB, saveConfessionCB} = props;
   const editorRef = React.useRef<Editor>(null);

   React.useEffect(() => {
      editorRef.current?.focus();
   }, []);

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
         <DialogTitle sx={{fontWeight: 'bold'}}>Write your confession</DialogTitle>
         <DialogContent>
            <DialogContentText>
               Don't use any profanity or hate speech. Such posts won't be approved. You can include references of the person you want to confess to.<br />
               You can use <b>ctrl + b</b>, <i>ctrl + i</i>, <u>ctrl + u</u> to bold, italicize, and underline text. <i>We think 500 words are enough to express your feelings</i>.
               <br />
            </DialogContentText>
            <div className="border-[2px] rounded-md border-[#333346] px-2 py-3 mt-2 min-h-[150px] hover:cursor-text" onClick={_ => editorRef.current?.focus()} >
               <Editor 
                  editorState={editorState} 
                  handleKeyCommand={handleKeyCommand}
                  onChange={onChangeCB} 
                  placeholder={`Hey xyz,\nI want to confess ...\n\nWith love,\nabc`}
                  ref={editorRef}
               />
            </div>
         </DialogContent>
         <DialogActions>
            <Button 
               onClick={handleModalCloseCB} 
               color="warning" 
               sx={{marginRight: '8px', fontWeight: 'bold'}}>
                  Cancel
            </Button>
            <Button 
               onClick={saveConfessionCB} 
               sx={{bgcolor: '#6D6D86', fontWeight: 'bold', ":hover": {bgcolor: '#333346'}}}
               variant="contained">
               Save
            </Button>
        </DialogActions>
      </Dialog>
   )
}
