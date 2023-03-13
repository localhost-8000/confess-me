import { AuthContext } from '../contexts/AuthContext';
import { redirect } from 'react-router-dom';
import { useAuth } from '~/lib/firebase';
import { useContext } from 'react';

const img = "https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwzfHxhdmF0YXJ8ZW58MHx8fHwxNjc4NDYzOTM4&ixlib=rb-4.0.3&q=80&w=1080";

export default function NavBar() {
   const { user } = useContext(AuthContext);

   const logOutUser = () => {
      const auth = useAuth();
      auth.signOut();
      redirect("/");
   }

   return (
      <div className="navbar bg-[#333346] mt-3 max-w-[1200px] mx-auto rounded-xl">

         <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl text-white" href="/about">confess-me</a>
         </div>

         <div className="flex-none gap-2">
               <div><p className="text-white font-semibold">Hey, { user?.displayName }</p></div>

               <div className="dropdown dropdown-end">

               <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

                  <div className="w-10 rounded-full">
                     <img src={user && user.photoURL ? user.photoURL : img} loading="lazy" />
                  </div>

               </label>

               <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">

                  <li><a href={`/profile/${user?.uid}`} className="justify-between">Profile</a></li>
                  <li><a href="/">Home</a></li>
                  <li><a onClick={logOutUser}>Logout</a></li>
               </ul>
            </div>
         </div>
      </div>
   )
}
