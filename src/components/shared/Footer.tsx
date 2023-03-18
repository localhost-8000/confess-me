import { Link } from 'react-router-dom';

export default function Footer() {
   return (
      <footer className="footer footer-center max-w-[1200px] mx-auto bg-[#333346] rounded-xl mt-8 p-4 text-[#c0c0e0] relative">
         <div className="grid grid-flow-col gap-4 text-[16px]">
            <Link className="link link-hover" to="/about">About us</Link> 
            <Link className="link link-hover" to="/contact">Contact us</Link> 
            <Link className="link link-hover" to="/terms">Terms of use</Link> 
            <Link className="link link-hover" to="/privacy">Privacy Policy</Link>
         </div> 
         <div className="-mt-3">
            <p>Created with 💖. Copyright © 2023 - All right reserved</p>
         </div>
      </footer>
  )
}
