import { Tag } from '~/types/post';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import NormalChip from '~/layouts/chips/NormalChip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface TagInputProps {
   tagName: Tag[];
   handleChangeCB: (e: SelectChangeEvent<Tag[]>) => void;
}

export default function TagInput(props: TagInputProps) {
   const {tagName, handleChangeCB} = props;

   return (
      <div className="w-full mt-4">
         <FormControl sx={{ width: '100%' }}>
            <InputLabel id="post-tags">Add Tags</InputLabel>
            <Select
               labelId="post-tags"
               id="post-tag"
               multiple
               value={tagName}
               onChange={handleChangeCB}
               input={<OutlinedInput id="select-multiple-tags" label="Add Tags" />}
               renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                     <NormalChip key={value} title={value} color="secondary" />
                  ))}
                  </Box>
               )}
               MenuProps={MenuProps}
            >
               {names.map((name) => (
                  <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, tagName)}
                  >
                  {name}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </div>
   )
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

const names: Tag[] = [
   "college",
   "confession",
   "farewell",
   "farewell2023",
   "friendship",
   "love",
   "shayari",
];

function getStyles(tagName: string, tags: readonly string[]) {
   return {
     fontWeight:
       tags.indexOf(tagName) === -1
         ? 500
         : 700,
   };
}
