import { College } from "~/utils/CollegeData";

export type PostStatus = "approved" | "rejected" | "pending";

export type PendingPostAttr = {
   statusId: string;
   status: PostStatus;
}

export type Post = {
   id?: string;
   collegeData: College | null;
   confession: string;
   likesCount: number;
   likes?: { [key: string]: boolean };
   createdAt?: string;
   reportCounts?: number;
}

export type PostWithStatus = Post & PendingPostAttr;

export type TextModerationResult = {
   "hate": boolean;
   "hate/threatening": boolean;
   "self-harm": false,
   "sexual": false,
   "sexual/minors": false,
   "violence": false,
   "violence/graphic": false
}

export type TextModerationReturnType = {
   isViolatingContent: boolean;
   message: string | undefined;
   error?: boolean;
}