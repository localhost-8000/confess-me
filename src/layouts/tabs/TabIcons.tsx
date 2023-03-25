import { styled } from '@mui/material/styles';
import { Tab, Tabs, useMediaQuery } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';

interface TabIconsProps {
   value: number;
   handleChangeCB: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function TabIcons(props: TabIconsProps) {

   return <StyledTabs value={props.value} onChange={props.handleChangeCB}>
      <StyledTab label={<HomeTabIcon />} {...a11yProps(0)} />
      <StyledTab label={<TrendingTabIcon />} {...a11yProps(1)} />
      <StyledTab label={<AddTabIcon />} {...a11yProps(2)} />
      <StyledTab label={<SearchTabIcon />} {...a11yProps(3)} />
   </StyledTabs>
}

function a11yProps(index: number) {
   return {
     id: `full-width-tab-${index}`,
     'aria-controls': `full-width-tabpanel-${index}`,
   };
}

const HomeTabIcon = (): React.ReactElement => {
   const isMobile = useMediaQuery('(max-width: 500px)');

   return <>
      <HomeIcon fontSize={isMobile ? "medium" : "large"} />
      <span className="text-[11px]">Home</span>
   </>
}

const AddTabIcon = (): React.ReactElement => {
   const isMobile = useMediaQuery('(max-width: 500px)');

   return <>
      <AddCircleIcon fontSize={isMobile ? "medium" : "large"} />
      <span className="text-[11px]">Add</span>
   </>
}

const TrendingTabIcon = (): React.ReactElement => {
   const isMobile = useMediaQuery('(max-width: 500px)');
   return <>
      <WhatshotIcon fontSize={isMobile ? "medium" : "large"} />
      <span className="text-[11px]">Trending</span>
   </>
}

const SearchTabIcon = (): React.ReactElement => {
   const isMobile = useMediaQuery('(max-width: 500px)');
   return <>
      <ContentPasteSearchIcon fontSize={isMobile ? "medium" : "large"} />
      <span className="text-[11px]">Search</span>
   </>
}

interface StyledTabsProps {
   children?: React.ReactNode;
   value: number;
   onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
   <Tabs
     {...props}
     TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
   />
 ))({
   '& .MuiTabs-indicator': {
     display: 'flex',
     justifyContent: 'center',
     backgroundColor: 'red',
     height: '3px'
   },
   '& .MuiTabs-indicatorSpan': {
     width: '100%',
     backgroundColor: 'red',
   },
   "& .MuiTabs-flexContainer": {
      justifyContent: 'space-evenly'
   }
 });

interface StyledTabProps {
   label: React.ReactElement;
 }
 
const StyledTab = styled((props: StyledTabProps) => (
   <Tab disableRipple {...props} />
 ))(({ theme }) => ({
   textTransform: 'none',
   fontWeight: theme.typography.fontWeightRegular,
   fontSize: theme.typography.pxToRem(15),
   marginRight: theme.spacing(1),
   color: 'rgba(255, 255, 255, 0.7)',
   '&.Mui-selected': {
     color: '#fff',
   },
   '&.Mui-focusVisible': {
     backgroundColor: 'rgba(100, 95, 228, 0.32)',
   },
 }));