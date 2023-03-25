import { logEvent } from 'firebase/analytics';
import { useEffect } from 'react';
import { useAnalytics } from '~/lib/firebase';

import Footer from '../shared/Footer';
import NavBar from '../shared/NavBar';
import FeedTab from '~/layouts/tabs/FeedTab';
 

export default function HomePage() {

   useEffect(() => {
      const analytics = useAnalytics();
      logEvent(analytics, "page_view", {
         page_title: "Home",
         page_location: window.location.href,
         page_path: "/home"
      });
   }, []);

   return (
      <>
         <NavBar />
         <div className="max-w-[1200px] mx-auto bg-[#333346] rounded-lg mt-6 md:mt-8">
            <FeedTab />
         </div>
         <Footer />
      </>
   )
}
