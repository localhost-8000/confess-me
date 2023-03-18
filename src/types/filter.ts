import { College } from "~/utils/CollegeData";

export type FilterOption = {
   college: College | null;
   sortBy: 'none' | 'most_recent' | 'most_liked';

}

export type SortOption = {
   id: string;
   value: string;
}


export const sortOptions: SortOption[] = [
   { id: 'none', value: 'None'},
   { id: 'most_recent', value: 'Most Recent'},
   { id: 'most_liked', value: 'Most Liked'}
]