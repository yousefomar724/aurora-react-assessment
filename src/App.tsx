import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/layout";

const Weather = lazy(() => import("./pages/weather"));
const WeatherDetails = lazy(() => import("./pages/weather-details"));
const Crypto = lazy(() => import("./pages/crypto"));
const Covid = lazy(() => import("./pages/covid"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Weather />,
      },
      {
        path: "weather/:city",
        element: <WeatherDetails />,
      },
      {
        path: "crypto",
        element: <Crypto />,
      },
      {
        path: "covid",
        element: <Covid />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
