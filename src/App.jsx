import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import BuyPage from "./routes/BuyPage/BuyPage";
import RentPage from "./routes/RentPage/RentPage";
import SinglePost from "./routes/SinglePost/SinglePost";
import LoginPage from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import ProtectedRoute from "./api/ProtectedRoute";
import Dashboard from "./routes/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import HomePage from "./routes/HomePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "buy", element: <BuyPage /> },
      { path: "rent", element: <RentPage /> },
      { path: ":id", element: <SinglePost /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <Register /> },
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
  return <RouterProvider router={router} />;
}

export default App;
