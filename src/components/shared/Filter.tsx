import { College, colleges } from '~/utils/CollegeData';
import { FilterOption, sortOptions } from '~/types/filter';
import { Paper } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface FilterProps {
   filterOptions: FilterOption;
   applyFilterOnPostsCB: (filterOptions: FilterOption) => void;
}

export default function Filter(props: FilterProps) {
   const { filterOptions } = props;
   const [expanded, setExpanded] = React.useState<string | false>(false);
   const [college, setCollege] = React.useState<College | null>(null);
   const [sortBy, setSortBy] = React.useState<FilterOption['sortBy']>('none');
   
   const handleChange = (panel: string) => 
      (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
   };

   const handleSortFilterChange = (event: SelectChangeEvent) => {
      const newSortBy = event.target.value as FilterOption['sortBy'];

      setSortBy(newSortBy);
   };

   const handleCollegeFilterChange = (_: React.SyntheticEvent<Element, Event>, value: College | null) => {
      const newCollege = value;

      setCollege(newCollege);
   }

   const clearFilter = () => {
      setSortBy('none');
      setCollege(null);
   }

   const ApplyFilters = () => {
      setExpanded(false);
      props.applyFilterOnPostsCB({college, sortBy});
   }

   return (
      <div className="max-w-[1200px] mx-auto bg-[#333346] rounded-xl mt-6 p-3">
         <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

            <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls="panel1bh-content"
               id="panel1bh-header"
            >
               <Typography 
                  variant="h5" 
                  sx={{ width: '33%', flexShrink: 0, fontSize: '18px', fontWeight: 'bold' }}>
                  Apply Filters
               </Typography>

               <Typography 
                  sx={{ color: 'text.secondary' }}>
                  {filterOptions.college ? <span><b>College:</b> {filterOptions.college.name}</span> : null}
                  {filterOptions.sortBy !== 'none' ? <span><b> Sort By:</b> {filterOptions.sortBy}</span> : null}
               </Typography>

            </AccordionSummary>
            <AccordionDetails sx={{display: 'flex'}} className="flex-col md:flex-row gap-4 items-center justify-evenly">
               <Paper elevation={3} sx={{ maxWidth: '380px', width: '90%', padding: '10px'}} className="md:w-[40%]">
                  <Autocomplete
                     disablePortal
                     id="search-college"
                     value={college}
                     options={colleges}
                     sx={{ width: '100%', marginY: '4px' }}
                     getOptionLabel={(option) => option.name}
                     renderInput={(params) => <TextField {...params} label="Search College" />} 
                     onChange={handleCollegeFilterChange}
                  />
               </Paper>
               <Paper elevation={3} sx={{ maxWidth: '300px', width: '90%', padding: '10px'}} className="md:-w-[30%]">
                  <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label" sx={{marginTop: '4px'}}>Sort By</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortBy}
                        label="Sort By"
                        onChange={handleSortFilterChange}
                        sx={{marginY: '4px'}}
                     >
                        {sortOptions.map((option) => (
                           <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Paper>
               <Button variant="contained" sx={{width: '90%', maxWidth: '200px', bgcolor: '#6D6D86', fontWeight: 'bold'}} className="md:w-[60%]" onClick={ApplyFilters}>Apply</Button>
               
               <Button variant="outlined" sx={{width: '90%', maxWidth: '140px', fontWeight: 'bold'}} className="md:w-[50%]" onClick={clearFilter} color="warning">Clear</Button>
            </AccordionDetails>
         </Accordion>

      </div>
   )
}
