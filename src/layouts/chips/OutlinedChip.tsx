import { Chip } from '@mui/material'

interface OutlinedChipProps {
   title: string;
   sx?: any;
}

export default function OutlinedChip(props: OutlinedChipProps) {
   return (
      <Chip label={props.title} sx={props.sx} variant="outlined" />
   )
}
