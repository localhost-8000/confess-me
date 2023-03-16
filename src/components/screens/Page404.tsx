import { Link } from "react-router-dom"

function Page404() {
  return (
   <div className="hero min-h-screen">
      <div className="text-center hero-content text-3xl font-bold">
         <div>
         <h1>
            You're on the wrong page!!
         </h1>
         <div className='mt-4'>
            <Link to='/' className='link-primary'>Go to Home page</Link>
         </div>
         </div>
      </div>
   </div>
  )
}

export default Page404
