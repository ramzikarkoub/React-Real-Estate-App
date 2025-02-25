import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import HomePage from "./routes/homePage/HomePage";
import BuyPage from "./routes/buyPage/BuyPage";
import RentPage from "./routes/rentPage/RentPage";
import SinglePost from "./routes/singlePost/SinglePost";
import LoginPage from "./routes/login/Login";
import Register from "./routes/register/Register";
import ProtectedRoute from "./api/ProtectedRoute";
import Dashboard from "./routes/dashboard/Dashboard";

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
