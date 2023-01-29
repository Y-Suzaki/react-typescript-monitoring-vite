import { memo, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../components/pages/Home';
import { Login } from '../components/pages/Login';
import { Setting } from '../components/pages/Setting';
import { NotFound } from '../components/pages/NotFound';

import { PrivateRouter } from './PrivateRouter';
import { useAuth } from '../hooks/useAuth';
import { useAuthSession } from '../hooks/useAuthSession';
import { LoadingSpinner } from '../components/atoms/spinner/LoadingSpinner';
import { Location } from '../components/pages/Location';
import { Event } from '../components/pages/Event';
import { News } from '../components/pages/News';
import { Device } from '../components/pages/Device';
import { Ota } from '../components/pages/Ota';
import { array } from 'yup';

export const Router = function Router() {
  const { isAuthenticated, isLoading, allowedServices } = useAuth();
  const { authSession } = useAuthSession();
  console.log(`Public Router: ${isAuthenticated}, ${isLoading}`);

  useEffect(() => {
    (async () => {
      await authSession();
    })();
  }, []);

  return (
    <Routes>
      {!isLoading ? (
        <>
          <Route path={'/'} element={<Login />} />
          {isAuthenticated ? (
            <Route
              path={'/home/*'}
              element={<Homes isAuthenticated={isAuthenticated} allowedServices={allowedServices} />}
            />
          ) : (
            <Route path={'/home/*'} element={<Navigate to="/" />} />
          )}

          <Route path={'*'} element={<NotFound />} />
        </>
      ) : (
        <Route path={'*'} element={<LoadingSpinner />} />
      )}
    </Routes>
  );
};

const Homes = memo(function Homes(props: { isAuthenticated: boolean; allowedServices: Array<string> }) {
  const { isAuthenticated, allowedServices } = props;
  console.log(`Homes: Router. ${isAuthenticated}`);
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <PrivateRouter isAuthenticated={isAuthenticated}>
            <Home />
          </PrivateRouter>
        }
      />

      {allowedServices.includes('location') ? (
        <Route
          path={'/location'}
          element={
            <PrivateRouter isAuthenticated={isAuthenticated}>
              <Location />
            </PrivateRouter>
          }
        />
      ) : null}

      <Route
        path={'/event'}
        element={
          <PrivateRouter isAuthenticated={isAuthenticated}>
            <Event />
          </PrivateRouter>
        }
      />
      <Route
        path={'/setting'}
        element={
          <PrivateRouter isAuthenticated={isAuthenticated}>
            <Setting />
          </PrivateRouter>
        }
      />

      <Route
        path={'/news'}
        element={
          <PrivateRouter isAuthenticated={isAuthenticated}>
            <News />
          </PrivateRouter>
        }
      />

      <Route
        path={'/device'}
        element={
          <PrivateRouter isAuthenticated={isAuthenticated}>
            <Device />
          </PrivateRouter>
        }
      />

      <Route
        path={'/ota'}
        element={
          <PrivateRouter isAuthenticated={isAuthenticated}>
            <Ota />
          </PrivateRouter>
        }
      />

      {/*<Route path={'/user_management'} element={<UserManagement />} />*/}
      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
});
