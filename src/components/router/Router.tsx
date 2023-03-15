import { Suspense } from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { getAppRoutes } from './routes';

const FallbackLoading = () => <p>Loading...</p>;

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
         <Suspense fallback={<FallbackLoading />}>{routeElement}</Suspense>
      </div>
   )
}
