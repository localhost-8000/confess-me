import { AuthContext } from '../contexts/AuthContext';
import { Link, redirect } from 'react-router-dom';
import { useAuth } from '~/lib/firebase';
import { useContext } from 'react';
import logoImg from '~/assets/confess-me-logo.png';

const img = "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHw0fHxjYXR8ZW58MHx8fHwxNjc4OTU1NDIx&ixlib=rb-4.0.3&q=80&w=1080";

const getFormattedUserName = (name: string | null | undefined) => {
   if(!name) return "User";
   const firstName = name.split(" ")[0];
   if(firstName.length > 10) return firstName.slice(0, 8) + "..";
   return firstName;
}

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
            <Link to="/about" className="btn btn-ghost normal-case text-xl text-white">
               <div className="flex h-full w-full items-center">
                  <img src={logoImg} alt="company logo" className="h-full" />
                  <span className="-mt-1 ml-2">confess-me</span>
               </div>
               </Link>
         </div>

         <div className="flex-none gap-2">
               <div className="text-[#bebef4] font-semibold pr-2 hover:text-[#c2c2d7]">
                  <Link to="/status">Check post status</Link>
               </div>
               <div><p className="text-white font-semibold">Hey, { getFormattedUserName(user?.displayName) }</p></div>
               <div className="dropdown dropdown-end">

               <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

                  <div className="w-10 rounded-full">
                     <img src={user && user.photoURL ? user.photoURL : img} loading="lazy" />
                  </div>

               </label>

               <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">

                  <li><Link to={`/profile/${user?.uid}`} className="justify-between">Profile</Link></li>
                  <li><Link to="/">Home</Link></li>
                  <li><a onClick={logOutUser}>Logout</a></li>
               </ul>
            </div>
         </div>
      </div>
   )
}
