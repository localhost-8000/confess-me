
interface TabPanelProps {
   children?: React.ReactNode;
   dir?: string;
   index: number;
   value: number;
}

export default function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`full-width-tabpanel-${index}`}
         aria-labelledby={`full-width-tab-${index}`}
         {...other}
         className="text-white w-full h-fit max-h-[calc(100vh-6.75rem)] overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-track-[#b0b0d4] scrollbar-thumb-[#3e3e50] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-none"
      >
         {value === index && (
         <div className="w-full flex flex-col items-center py-4 px-[6px]">
            { children }
         </div>
         )}
      </div>
   );
}
