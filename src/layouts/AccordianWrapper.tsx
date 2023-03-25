import { styled } from '@mui/material/styles';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import React from 'react';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
   <MuiAccordion disableGutters elevation={0} square {...props} />
 ))(({ theme }) => ({
   border: `1px solid ${theme.palette.divider}`,
   '&:not(:last-child)': {
     borderBottom: 0,
   },
   '&:before': {
     display: 'none',
   },
   width: '100%',
   borderRadius: '4px',
 }));
 
 const AccordionSummary = styled((props: AccordionSummaryProps) => (
   <MuiAccordionSummary
     expandIcon={<AddCircleOutlineIcon sx={{ fontSize: '1.3rem' }} />}
     {...props}
   />
 ))(({ theme }) => ({
   backgroundColor:
     theme.palette.mode === 'dark'
       ? 'rgba(255, 255, 255, .05)'
       : 'rgba(0, 0, 0, .03)',
   flexDirection: 'row-reverse',
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
     transform: 'rotate(90deg)',
   },
   '& .MuiAccordionSummary-content': {
     marginLeft: theme.spacing(1),
   },
 }));
 
 const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
   padding: theme.spacing(2),
   borderTop: '1px solid rgba(0, 0, 0, .125)',
 }));

interface AccordianWrapperProps {
   title: string;
   children: React.ReactNode;
};

export default function AccordianWrapper(props: AccordianWrapperProps) {
   const [expanded, setExpanded] = React.useState<string | false>(false);

   const handleChange = (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
         setExpanded(newExpanded ? panel : false);
   };

   return (
      <div className="w-full max-w-[600px] mb-4">
         <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls={`${props.title}`} id="panel1d-header">
               <Typography sx={{ fontWeight: 'seme-bold' }}>{ props.title }</Typography>
            </AccordionSummary>
            <AccordionDetails aria-controls={`${props.title}-content`}>
               { props.children }
            </AccordionDetails>
         </Accordion>
      </div>
   )
}
