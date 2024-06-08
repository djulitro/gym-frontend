import { Navigate, useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
// components

// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
// Components
import LoadingScreen from '../components/LoadingScreen';
//

// ----------------------------------------------------------------------


const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        // { path: 'two', element: <PageTwo /> },
        // { path: 'three', element: <PageThree /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/four" replace />, index: true },
            { path: 'admin', element: <AdminPage /> },
            // { path: 'four', element: <PageFour /> },
            // { path: 'five', element: <PageFive /> },
            // { path: 'six', element: <PageSix /> },
          ],
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}


const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
const AdminPage = Loadable(lazy(() => import('../pages/users/admins')))
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
