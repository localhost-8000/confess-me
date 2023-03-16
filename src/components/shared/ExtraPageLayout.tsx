import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';
import Footer from './Footer';

interface ExtraPageLayoutProps {
   children: React.ReactNode;
   title: string;
}

export default function ExtraPageLayout(props: ExtraPageLayoutProps) {

   return (
      <div className="w-full h-full pt-3">
         <div className="max-w-[1200px] mx-auto bg-[#333346] rounded-xl px-2 py-4 h-fit flex">
            <Link to='/' className="text-xl font-semibold text-[#c1c1ee]"><KeyboardBackspaceIcon /> Home</Link>
            <h1 className="text-2xl font-bold text-[#c1c1ee] ml-[37%]">{ props.title }</h1>
         </div>
         <div className="max-w-[1200px] mx-auto bg-[#333346] rounded-xl mt-8 px-6 py-4 h-fit max-h-[calc(100vh-6.75rem)] overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-track-[#b0b0d4] scrollbar-thumb-[#3e3e50] scrollbar-track-rounded-md scrollbar-thumb-rounded-md text-[#a5a5d2]">
            {props.children}
         </div>
         <Footer />
      </div>
   )
}
