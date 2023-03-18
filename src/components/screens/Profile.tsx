import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

import Footer from '../shared/Footer';
import NavBar from '../shared/NavBar';

export default function Profile() {
   const { user } = useContext(AuthContext);

   return (
      <>
         <NavBar />
         <div className="max-w-[1200px] mx-auto bg-[#333346] rounded-xl mt-8 px-2 py-4 h-fit max-h-[calc(100vh-6.75rem)] overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-track-[#b0b0d4] scrollbar-thumb-[#3e3e50] scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
            <div className="w-[100%] flex flex-col items-center text-[#c0c0e0]">
               <h3 className="text-xl font-bold">Hey, { user?.displayName}👋🏼. Glad to see you here</h3>
               <h3 className="text-lg font-semibold my-2">Profile Page is in progress!! Sorry for inconvenience.</h3>
               <h3 className="text-lg font-semibold">Soon you will be able to see how many confessions you've liked.</h3>
            </div>
         </div>
         <Footer />
      </>
   )
}
