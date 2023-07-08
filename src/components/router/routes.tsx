import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import AdminAuthWrapper from "./AdminAuthWrapper";

const About = lazy(() => import('~/components/screens/About'))
const AdminPanel = lazy(() => import('~/components/admin_panel/AdminPanel'));
const DevelopersInfo = lazy(() => import('~/components/screens/DevelopersInfo'));
const HomePage = lazy(() => import('~/components/screens/HomePage'));
const LandingPage = lazy(() => import('~/components/screens/LandingPage'));
const Page404Screen = lazy(() => import('~/components/screens/Page404'));
const PostStatus = lazy(() => import('~/components/screens/PostStatus'));
const PostView = lazy(() => import('~/components/shared/PostView'));
const PrivacyPolicy = lazy(() => import('~/components/screens/PrivacyPolicy'));
const Profile = lazy(() => import('~/components/screens/Profile'));
const TermsOfUse = lazy(() => import('~/components/screens/TermsOfUse'));


const BaseRoutes: RouteObject[] = [{
   path: '/about',
   element: <About />
}, {
   path: '/contact',
   element: <DevelopersInfo />
}, {
   path: '/login',
   element: <LandingPage />
}, {
   path: '/privacy',
   element: <PrivacyPolicy />
}, {
   path: '/terms',
   element: <TermsOfUse />
}, {
   path: '/admin/:id',
   element: <AdminAuthWrapper><AdminPanel /></AdminAuthWrapper>
}, {
   path: '/post/:id',
   element: <PostView />
}, {
   path: '*',
   element: <Page404Screen />,
}];

export const getAppRoutes = () => {
   const ProtectedRoutes: RouteObject[] = [{
      path: '/',
      element: <HomePage />,
   }, {
      path: '/profile/:id',
      element: <Profile />
   }]

   const routes: RouteObject[] = [...BaseRoutes, ...ProtectedRoutes];
   
   return routes;
}