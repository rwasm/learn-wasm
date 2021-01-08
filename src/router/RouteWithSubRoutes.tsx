/**
 * @author: lencx
 * @create_at: Jan 09, 2021
 */

import React, { FC, Suspense } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { RouteOption } from './types';

const RouteWithSubRoutes: FC<RouteOption> = (routeProps) => {
  return (
    <Suspense fallback={routeProps.fallback || null}>
      <Route
        path={routeProps.path}
        render={(props: RouteProps) => routeProps.component &&
          <routeProps.component {...props} routes={routeProps.routes} />}
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;