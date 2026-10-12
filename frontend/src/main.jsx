import { createRoot } from "react-dom/client";
import "./index.css";
import AppLayout from "./components/AppLayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.jsx";
import Error from "./components/Error.jsx";
import { StrictMode, lazy, Suspense } from "react";
import RestaurantDetails from "./pages/RestaurantDetails.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const AboutPage = lazy(() => import("./pages/About.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "about",
        element: (
          <Suspense
            fallback={
              <div className="container py-16 flex flex-col justify-center items-center min-h-[50vh] text-center">
                <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading About page...</p>
              </div>
            }
          >
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "restaurant/:resId",
        element: <RestaurantDetails />,
      },
    ],
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
