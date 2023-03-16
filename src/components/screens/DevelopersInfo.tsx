import { Avatar, Divider, Link } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ExtraPageLayout from '../shared/ExtraPageLayout'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const img = "https://drive.google.com/uc?export=view&id=1ZoatOpdNojDjpT9HXaQB850oNu4FI3c1";

export default function DevelopersInfo() {
   return (
      <ExtraPageLayout title="Contact us">
         <div className="flex flex-col text-[#a5a5d2] pb-4">
            <div className="text-center">
               <h4 className="text-xl font-bold border-b-2 border-b-[#7c7ca9] pb-2">Tell us what you like and what you don't</h4>
               <p className="pt-2 max-w-[900px] mx-auto text-[18px]">We value your feedback and we would love to hear from you!
                  <br />
                  If you have any suggestions, comments or concerns about our platform, please let us know. We are committed to providing you with the best experience possible, and we rely on your feedback to help us improve.
                  <br />
                  <br />
                  Your feedback is important to us, whether it's positive or negative. We want to hear what you love about our platform, as well as any areas where you think we can improve. Your feedback helps us identify problems and make changes that benefit our entire community.
                  <br />
                  <br />
                  We appreciate your support and we look forward to hearing from you!
               </p>
               <Link 
                  href="https://forms.gle/JNT22Y9JhN2NkAK47" 
                  target="_blank" 
                  underline='none'
                  sx={{fontSize: '20px', color: '#ff9dab', fontWeight: 'bold', marginTop: '6px', display: 'flex'}}
                  className="items-center justify-center"
                  >
                  Submit your feedback here &nbsp; <BorderColorIcon color='inherit' />
               </Link>
            </div>
            <Divider color="#7c7ca9" sx={{height: '2px', marginY: '14px'}}/>
            <h3 className="text-2xl text-center font-bold text-[#c1c1ee]">Developer Info</h3>
            <div className="flex items-center justify-center pt-4">
               <div className="flex items-center justify-center w-1/2">
                  <Avatar 
                     src={img}
                     alt="Developer Profile Pic"
                     sx={{ width: 170, height: 170 }}
                  />
                  <div className="ml-4">
                     <h4 className="text-2xl font-bold">Rahul Tiwari</h4>
                     <h5 className="text-md font-semibold">Application Developer @Google</h5>
                  </div>
               </div>
               <div className="text-center w-1/2">
                  <p className="text-lg font-semibold mt-4">About Me</p>
                  <p className="text-md font-normal mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum ducimus animi amet exercitationem, iusto fugit fuga ea voluptates sequi consectetur!</p>
                  <div className="flex justify-center mt-2 gap-3">
                     <Link href="https://www.linkedin.com/in/rahul-localhost/" target="_blank" underline='none' sx={{}}><LinkedInIcon sx={{width: '40px', height: '40px'}} /></Link>
                     <Link href="https://www.instagram.com/localhost__3000/" target="_blank" underline='none' sx={{}}><InstagramIcon sx={{width: '40px', height: '40px'}} /></Link>
                  </div>
               </div>

            </div>
         </div>
      </ExtraPageLayout> 
   )
}
