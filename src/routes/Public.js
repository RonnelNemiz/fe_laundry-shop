import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
// import Loader from "../layouts/Loader";
// import BackdropLoader from "../layouts/BackdropLoader";

function Public(props) {
	const { component, ...rest } = props;
	const Component = lazy(() => import(`../${component}`));

	return (
		<Route
			{...rest}
			render={(props) => (
				<Suspense fallback={<div>Loading</div>}>
					<Component {...props} />
				</Suspense>
			)}
		/>
	);
}

export default Public;
