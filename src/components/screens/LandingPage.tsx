import { AuthContext } from '../contexts/AuthContext';
import { Button } from '@mui/material';
import { SignInButton } from '../domain/auth/SignInButton';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonWithIcon from '~/layouts/buttons/ButtonWithIcon';
import MaxWidthModal from '~/layouts/modals/MaxWidthModal';
import Footer from '../shared/Footer';

export default function LandingPage() {
   const { user } = useContext(AuthContext);
   const [open, setOpen] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if(user) navigate("/");
   }, [user]);

   const handleModalClose = () => {
      setOpen(false);
   }

  return (
    <div className="bg-[#333346] text-white">
      {/* <header className="absolute inset-x-0 top-0 z-50">
        
      </header> */}

      <div className="relative isolate px-6 pt-8 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full py-1 px-3 text-[16px] leading-6 ring-1 ring-gray-300">
               Have you ever had a crush or love 💖 that you couldn't talk about with anyone?
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Confess your feelings anonymously
            </h1>
            <p className="mt-6 text-lg leading-8 max-w-[1200px] mx-auto">
               You'll be surprised at how much better you'll feel just by getting it off your chest. And who knows, you might even find someone who shares your feelings and can provide you with the support you need.
            </p>
            <div className="mt-10 flex flex-col gap-6 md:flex-row items-center justify-center gap-x-6">
                <SignInButton />
                <ButtonWithIcon />
            </div>
            <Button sx={{marginTop: '1.5rem', color: 'white', fontWeight: 'bold'}} onClick={_ => setOpen(true)}>Why I need to SignIn ?</Button>
            <MaxWidthModal title="Why signup is needed?" open={open} handleCloseCB={handleModalClose}>
               At <b>confess-me</b>, we believe in providing a safe and positive platform for our users to share their thoughts and confessions.
               <br /><br />
               <b>We didn't link author information to posts</b>, so you can share your thoughts and confessions anonymously. However, we do require you to sign in to access some of our features, such as liking and commenting on posts. <br /><br />
               By signing in, you can <b>like or dislike posts, report inappropriate content</b>, and help us keep the platform clean and positive. In addition, we may use your email address to send you <b>notifications and updates</b> about the platform in the future.
               <br /><br />
               We value your privacy and security, and have detailed our policies in our <b>Privacy Policy</b> and <b>Terms of Use</b> pages. We promise to never share your personal information with any third-party without your consent.
               <br /><br />
               We hope, we made it clear. If you have any questions, <b>submit your feedback by visiting our Contact Us page</b>.
            </MaxWidthModal>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-35rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <Footer />
    </div>
  )
}
