import React from 'react'

export default function Footer() {
   return (
      <footer className="footer footer-center max-w-[1200px] mx-auto bg-[#333346] rounded-xl mt-8 p-4 text-[#c0c0e0] relative">
         <div className="grid grid-flow-col gap-4 text-[16px]">
            <a className="link link-hover" href="/about">About us</a> 
            <a className="link link-hover" href="/contact">Contact us</a> 
            <a className="link link-hover" href="/terms">Terms of use</a> 
            <a className="link link-hover" href="/privacy">Privacy Policy</a>
         </div> 
         <div>
            <p>Created with 💖. Copyright © 2023 - All right reserved</p>
         </div>
      </footer>
  )
}
