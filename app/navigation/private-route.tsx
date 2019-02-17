import { RouteProps, Route, Redirect, match } from "react-router";
import React from "react";

import { useUserService } from "../user";

export interface PrivateRouteProps extends RouteProps {
  component: any;
}

const privateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { computedMatch } = rest as any; // TODO: know its there, but havent found correct interface yet!
  const [{ isAuthenticated }] = useUserService();
  return (
    <Route
      render={props =>
        isAuthenticated ? (
          <Component {...props} match={computedMatch} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default privateRoute;
