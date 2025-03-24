import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./api/ProtectedRoute";
import Dashboard from "./routes/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import HomePage from "./routes/HomePage/HomePage";
import RentPage from "./routes/RentPage/RentPage";
import SinglePostPage from "./routes/SinglePost/SinglePost";
import LoginPage from "./routes/Login/Login";
import RegisterPage from "./routes/Register/Register";
import BuyPage from "./routes/BuyPage/BuyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "buy", element: <BuyPage /> },
      { path: "rent", element: <RentPage /> },
      { path: ":id", element: <SinglePostPage /> },
      { path: "login", element: <LoginPage /> },
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
  return <RouterProvider router={router} />;
}

export default App;
