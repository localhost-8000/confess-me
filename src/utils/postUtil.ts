import { convertFromRaw, EditorState } from "draft-js";
import { SnackbarAction } from "~/types/auth";
import { AlertSeverity } from "~/types/extra";
import { TextModerationResult } from "~/types/post";
import { College } from "./CollegeData";
import { base64urlEncodeWithoutPadding, base64Decode } from "@firebase/util";

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

   if(wordCount < 11) {
      errorMessage += "11 is a auspicious number. So, please write at least 11 words.";
   }

   if(wordCount > 500) {
      errorMessage += "500 words are enough to express your feelings.";
   }

   return errorMessage;
}

export const generateViolatingMessage = (result: TextModerationResult) => {
   let message = "";
   if(result["hate"]) {
      message += "Hate speech is not allowed. ";
   }
   if(result["hate/threatening"]) {
      message += "Threatening speech is not allowed. ";
   }
   if(result["self-harm"]) {
      message += "Self-harm is not allowed. ";
   }
   if(result["sexual"]) {
      message += "Sexual content is not allowed. ";
   }
   if(result["sexual/minors"]) {
      message += "Content involving minors is not allowed. ";
   }
   if(result["violence"]) {
      message += "Violent content is not allowed. ";
   }
   if(result["violence/graphic"]) {
      message += "Graphic violence is not allowed. ";
   }

   return message;
}

// Generate a shortened status code of length 6 from a post ID.
export const generateEncodedStatusId = (postId: string): string => {
   const encodedId = base64urlEncodeWithoutPadding(postId);
   return encodedId;
}

// Decode a shortened status code to retrieve the original post ID.
export const generateDecodedPostId = (statusCode: string): string | null => {
   const decodedId = base64Decode(statusCode);
   return decodedId;
}