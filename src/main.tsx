import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from './components/ErrorBoundary';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { AuthProvider } from './context/AuthContext';


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
    {/* <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider> */}
    <App />
    </ErrorBoundary>
  </React.StrictMode>
);