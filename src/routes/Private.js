import React, { lazy, Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import Defaults from "../layouts/private/Defaults";
// import Loader from "../layouts/Loader";
import { isAuth } from "../utils/helpers";

function Private(props) {
	const { component, ...rest } = props;
	const Component = lazy(() => import(`../${component}`));

	if (!isAuth()) {
		return <Route render={() => <Redirect to="login" />} />;
	}

	return (
		<Route
			{...rest}
			render={(props) => (
				<Suspense fallback={<div>Loading....</div>}>
					<Defaults>
						<Component {...props} />
					</Defaults>
				</Suspense>
			)}
		/>
	);
}

export default Private;
