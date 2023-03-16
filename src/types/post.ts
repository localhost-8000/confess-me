import { College } from "~/utils/CollegeData";

export type Post = {
   id?: string;
   collegeData: College | null;
   confession: string;
   likesCount: number;
   likes?: { [key: string]: boolean };
   createdAt?: string;
   reportCounts?: number;
}