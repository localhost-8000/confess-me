import React from 'react'
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function ButtonWithIcon() {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate('/');
   }

   return (
      <Button 
         variant="contained" 
         endIcon={<AccountCircleIcon />}
         onClick={handleClick}
         sx={{
            backgroundColor: "#857dff", 
            color: 'white', 
            fontSize: '18px', 
            fontWeight: 'bold',
            ":hover": {
               backgroundColor: "#554eba",
            }
         }}>
            Continue Anonymous
      </Button>
   )
}
