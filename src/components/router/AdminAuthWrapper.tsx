import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function AdminAuthWrapper(props: { children: React.ReactNode }) {
   const { id } = useParams<{ id: string }>();
   const [isAdmin, setIsAdmin] = useState(false);

   useEffect(() => {
      const authenticate = () => {
         const pin = import.meta.env.VITE_ADMIN_PIN;
         if(id === pin) setIsAdmin(true);
         else setIsAdmin(false);
      }
      authenticate();
   }, [id]);

   return isAdmin ? <>{props.children}</> : <div className="text-white flex items-center justify-center mt-4 text-xl font-semibold">
      You're requesting an admin page. Please enter the correct pin.
   </div>;
}
