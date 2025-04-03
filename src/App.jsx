import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./api/ProtectedRoute";
import Dashboard from "./routes/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import HomePage from "./routes/HomePage/HomePage";
import RentPage from "./routes/RentPage/RentPage";
import Login from "./routes/Login/Login";
import RegisterPage from "./routes/Register/Register";
import BuyPage from "./routes/BuyPage/BuyPage";
import SinglePost from "../src/routes/SinglePost/SinglePost";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "buy", element: <BuyPage /> },
      { path: "rent", element: <RentPage /> },
      { path: ":id", element: <SinglePost /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
