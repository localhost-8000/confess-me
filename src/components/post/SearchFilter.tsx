import { searchPosts } from '~/utils/databaseOps/post';
import { sortByMostRecent } from '~/utils/postUtil';
import { useEffect, useMemo, useState } from 'react';

import { FilterOption, sortOptions } from '~/types/filter'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Post } from '~/types/post';

import AccordianWrapper from '~/layouts/AccordianWrapper';
import AutoCompleteWrapper from '~/layouts/textfield/AutoCompleteWrapper';
import Feed from '../feed/Feed';
import FilledBtn from '~/layouts/buttons/FilledBtn';
import OutlinedChip from '~/layouts/chips/OutlinedChip';
import TextBtn from '~/layouts/buttons/TextBtn';

export default function SearchFilter() {
   const [filterOptions, setFilterOptions] = useState<FilterOption>({
      college: null,
      sortBy: 'none',
   });
   const [selectedFilter, setSelectedFilter] = useState<FilterOption>(filterOptions);
   const [loading, setLoading] = useState<boolean>(false);
   const [posts, setPosts] = useState<Post[]>([]);

   const filteredPosts = useMemo(() => {
      const { college, sortBy } = selectedFilter;
      if(college === null && sortBy === 'none') return [];
      
      setLoading(true);
      let filteredPosts = [...posts];

      if (college) {
         filteredPosts = filteredPosts.filter(post => post.collegeData?.name === college.name);
      }
      if (sortBy === 'most_recent') {
         filteredPosts = filteredPosts.sort((a, b) => sortByMostRecent(a.createdAt as string, b.createdAt as string));
      }
      if(sortBy === 'most_liked') {
         filteredPosts = filteredPosts.sort((a, b) => b.likesCount - a.likesCount);
      }
      setLoading(false);
      return filteredPosts;
   }, [selectedFilter]);

   useEffect(() => {
      setLoading(true);
      searchPosts(null).then(posts => {
         setPosts(posts);
         setLoading(false);
      });
   }, []);

   const applyFilter = () => {
      if(filterOptions.college === null && filterOptions.sortBy === "none") return;
      setLoading(true);

      setSelectedFilter({
         ...filterOptions
      });
   }

   const clearFilter = () => {
      setFilterOptions({college: null, sortBy: "none"});
      setSelectedFilter({college: null, sortBy: "none"});
   }

   return <>
      <AccordianWrapper title="Apply Filter">
         <AutoCompleteWrapper value={filterOptions.college} onChangeCB={(_, newValue) => setFilterOptions({...filterOptions, college: newValue})} /> 

         <FormControl fullWidth sx={{ marginTop: '4px'}}>
            <InputLabel id="demo-simple-select-label" sx={{marginTop: '4px'}}>Sort By</InputLabel>
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={filterOptions.sortBy}
               label="Sort By"
               onChange={e => setFilterOptions({...filterOptions, sortBy: e.target.value as FilterOption['sortBy']})}
               sx={{marginY: '4px'}}
            >
               {sortOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>
               ))}
            </Select>
         </FormControl>
         <div className="flex justify-start gap-4 mt-4">
            <FilledBtn color="info" text="Apply" onClickCB={applyFilter} sx={{width: '90%', maxWidth: '160px', bgcolor: '#6D6D86', fontWeight: 'bold'}} />

            <TextBtn color="warning" text="Clear" onClickCB={clearFilter} sx={{width: '90%', maxWidth: '140px', fontWeight: 'bold'}} />
         </div>
      </AccordianWrapper>

      {selectedFilter.college || selectedFilter.sortBy !== "none" ? <div className="flex flex-col gap-2 md:flex-row mb-4">
         { selectedFilter.college && <OutlinedChip title={`College: ${selectedFilter.college.name}`} sx={{color: 'white'}} />}
         { selectedFilter.sortBy !== 'none' && <OutlinedChip title={`Sort By: ${selectedFilter.sortBy}`} sx={{color: 'white'}} />}
      </div> : null}

      <Feed loading={loading} posts={filteredPosts} />
   </>;
}