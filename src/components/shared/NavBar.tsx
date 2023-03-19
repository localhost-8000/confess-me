import TagFacesIcon from '@mui/icons-material/TagFaces';
import Avatar from '@mui/material/Avatar';
import { useContext } from 'react';
import { Link, redirect } from 'react-router-dom';
import logoImg from '~/assets/confess-me-logo.png';
import { useAuth } from '~/lib/firebase';
import { AuthContext } from '../contexts/AuthContext';

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
      redirect("/login");
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
               <div className="text-[#bebef4] font-semibold pr-2 hover:text-[#c2c2d7] hidden sm:block">
                  <Link to="/status">Check post status</Link>
               </div>}
               <div><p className="text-white font-semibold">Hey, { getFormattedUserName(user?.displayName) }</p></div>
               <div className="dropdown dropdown-end">

               <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

                  <div className="w-10 rounded-full">
                     <Avatar 
                        src={user && user.photoURL ? user.photoURL : undefined} 
                        sx={{bgcolor: '#70709e', color: '#333346', border: '2px solid gray'}}
                     >
                        <TagFacesIcon sx={{width: '80%', height: '80%'}} />
                     </Avatar>
                  </div>

               </label>

               <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">

                  <li><Link to="/">Home</Link></li>
                  <li className="sm:hidden"><Link to="/status">Check post status</Link></li>
                  {user ? <>
                     <li><Link to={`/profile/${user?.uid}`} className="justify-between">Profile</Link></li>
                     <li><a onClick={logOutUser}>Logout</a></li>
                  </>: <>
                     <li><Link to="/login" className="justify-between">Login</Link></li>
                  </>}
               </ul>
            </div>
         </div>
      </div>
   )
}
