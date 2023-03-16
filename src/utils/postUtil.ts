import { convertFromRaw, EditorState } from "draft-js";
import { College } from "./CollegeData";

const getWordCount = (editorState : EditorState) => {
   const plainText = editorState.getCurrentContent().getPlainText('');
   // new line, carriage return, line feed
   const regex = /(?:\r\n|\r|\n)/g; 
   // replace above characters w/ space
   const cleanString = plainText.replace(regex, ' ').trim(); 
   // matches words according to whitespace
   const wordArray = cleanString.match(/\S+/g);  

   return wordArray ? wordArray.length : 0;
}

export const validatePost = (college: College | null, confession: string) => {
   let errorMessage = "";
   let wordCount = 0;

   if(college === null) {
      errorMessage = "Please select a college. ";
   }

   if(confession !== "") {
      const confessJson = JSON.parse(confession);
      const raw = convertFromRaw(confessJson);
      const editorState = EditorState.createWithContent(raw);
      wordCount = getWordCount(editorState);
   }

   if(wordCount < 20) {
      errorMessage += "More than 20 words needed to express your thoughts.";
   }

   if(wordCount > 500) {
      errorMessage += "500 words are enough to express your feelings.";
   }

   return errorMessage;
}