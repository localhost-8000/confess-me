import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import FlagIcon from '@mui/icons-material/Flag';

interface PostMenuProps {
   anchorEl: HTMLElement | null;
   handleCloseCB: () => void;
   reportPostCB: () => void;
}

export default function PostMenu(props: PostMenuProps) {
   const open = Boolean(props.anchorEl);

   return (
      <Menu
         anchorEl={props.anchorEl}
         id="account-menu"
         open={open}
         onClose={props.handleCloseCB}
         onClick={props.handleCloseCB}
         PaperProps={{
            elevation: 0,
            sx: {
               overflow: 'visible',
               filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
               bgcolor: '#6d6d86',
               mt: 1.5,
               '& .MuiAvatar-root': {
               width: 32,
               height: 32,
               ml: -0.5,
               mr: 1,
               },
               '&:before': {
               content: '""',
               display: 'block',
               position: 'absolute',
               top: 0,
               right: 14,
               width: 10,
               height: 10,
               bgcolor: '#6d6d86',
               transform: 'translateY(-50%) rotate(45deg)',
               zIndex: 0,
               },
            },
         }}
         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
         <MenuItem onClick={props.reportPostCB} sx={{":hover": {bgcolor: '#59597a'}}}>
            <ListItemIcon color='inherit'>
               <FlagIcon fontSize="small" color='inherit' />
            </ListItemIcon>Report
         </MenuItem>
      </Menu>
   )
}
