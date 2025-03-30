import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/Layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "analytics",
        element: (
          <div className="text-gray-900 dark:text-white">Analytics Page</div>
        ),
      },
      {
        path: "settings",
        element: (
          <div className="text-gray-900 dark:text-white">Settings Page</div>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
