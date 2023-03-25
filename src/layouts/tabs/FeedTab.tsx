import * as React from 'react';
// import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TabIcons from './TabIcons';

export default function FeedTab() {
   const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

   return (
      <>
      <AppBar position="static">
         <TabIcons value={value} handleChangeCB={handleChange} />
      </AppBar>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      {/* </SwipeableViews> */}
      </>
   )
}

function a11yProps(index: number) {
   return {
     id: `full-width-tab-${index}`,
     'aria-controls': `full-width-tabpanel-${index}`,
   };
}

const HomeTabIcon = (): React.ReactElement => {
   return (
      <>
         <AddCircleOutlineIcon fontSize="large" />
         <span className="text-[11px]">Create</span>
      </>
   )
}