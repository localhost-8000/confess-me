import { Suspense } from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import Loading from '../shared/Loading';
import { getAppRoutes } from './routes';


export const Router = () => {
   // const { authLoading} = useContext(AuthContext);
   // if(authLoading) return <Loading />;

   return (
      <BrowserRouter basename="/">
         <AppRouter />
      </BrowserRouter>
   );
};

const AppRouter = () => {
   const routes = getAppRoutes();
   const routeElement = useRoutes(routes);

   return (
      <div>
         <Suspense fallback={<Loading />}>{routeElement}</Suspense>
      </div>
   )
}
