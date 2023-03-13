import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import LandingPage from '../screens/LandingPage';
import Loading from '../shared/Loading';

export default function ProtectedRouteWrapper(props: { children: React.ReactElement }): React.ReactElement {
   const { user, authLoading } = useContext(AuthContext);

   if(authLoading) return <Loading />;

   if(user) return props.children;
   
   return <LandingPage />
}
