import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { College, colleges } from '~/utils/CollegeData'

interface Props {
   value: College | null;
   onChangeCB: (event: React.ChangeEvent<{}>, newValue: College | null) => void;
}

export default function AutoCompleteWrapper(props: Props) {
   const { value, onChangeCB } = props;

   return (
      <Autocomplete 
         disablePortal
         id="select-college"
         options={colleges}
         getOptionLabel={(option) => option.name}
         renderInput={(params) => <TextField {...params} label="Select College" />}
         sx={{ width: '100%', marginBottom: '10px' }}
         value={value}
         onChange={onChangeCB}
      />
   )
}
