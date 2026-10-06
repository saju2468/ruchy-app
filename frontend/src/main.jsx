import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./components/Header.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Error from "./components/Error.jsx";
import { StrictMode } from "react";
import RestaurantDetails from "./pages/RestaurantDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
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
