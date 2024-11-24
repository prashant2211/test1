import { Suspense, useState } from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import Loader from "./components/Loader";
import './App.scss';
import { initialRoutes } from "./routes/routes";


const AppWrapper = () => {
  return initialRoutes().map(({ type, component: Component, ...rest }) => {
    return {
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute type={type} {...rest} >
            <Component />
          </ProtectedRoute>
        </Suspense>
      ),
      ...rest
    }
  })
}

export default AppWrapper();