import React, { lazy, Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import Defaults from "../layouts/private/Defaults";
import { isAuth, isCustomer } from "../utils/helpers";
import Loader from "../layouts/Loader";

function Private(props) {
  const { component, ...rest } = props;
  const Component = lazy(() => import(`../${component}`));

  if (!isAuth()) {
    return <Route render={() => <Redirect to="/login" />} />;
  }
  if (isCustomer()) {
    return <Route render={() => <Redirect to="/" />} />;
  }
  return (
    <Route
      {...rest}
      render={(props) => (
        <Suspense fallback={<Loader />}>
          <Defaults>
            <Component {...props} />
          </Defaults>
        </Suspense>
      )}
    />
  );
}

export default Private;
