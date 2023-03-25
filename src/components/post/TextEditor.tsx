import { Editor, EditorState, RichUtils } from 'draft-js'
import { forwardRef } from 'react';
import 'draft-js/dist/Draft.css';

interface TextEditorProps {
   editorState: EditorState;
   isReadOnly?: boolean;
   onChangeCB: (editorState: EditorState) => void | (() => void);
}

export const TextEditor = forwardRef((props: TextEditorProps, ref: any) => {
   const { editorState, isReadOnly, onChangeCB } = props;

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
      <Editor 
         editorState={editorState}
         onChange={onChangeCB}
         handleKeyCommand={handleKeyCommand}
         placeholder={`Hey xyz,\nI want to confess ...\n\nWith love`}
         ref={ref}
         readOnly={isReadOnly}
      />
   )
});
