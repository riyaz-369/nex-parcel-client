import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import LogIn from "../pages/LogIn/LogIn";
import Register from "../pages/Register/Register";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Dashboard/Common/Profile";
import PrivateRoute from "./PrivateRoute";
import BookParcel from "../pages/Dashboard/User/BookParcel";
import MyParcel from "../pages/Dashboard/User/MyParcel";
import MyDeliveryList from "../pages/Dashboard/DeliveryMen/MyDeliveryList";
import MyReviews from "../pages/Dashboard/DeliveryMen/MyReviews";
import AllParcel from "../pages/Dashboard/Admin/AllParcel";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllDeliveryMan from "../pages/Dashboard/Admin/AllDeliveryMan";
import AdminStatistics from "../pages/Dashboard/Admin/AdminStatistics";
import UpdateBooking from "../pages/Dashboard/User/UpdateBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      // COMMON
      {
        index: true,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      // USER
      {
        path: "book-parcel",
        element: (
          <PrivateRoute>
            <BookParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "my-parcel",
        element: (
          <PrivateRoute>
            <MyParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "update-booking/:id",
        element: (
          <PrivateRoute>
            <UpdateBooking />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/booking/${params.id}`),
      },
      // DELIVERY MAN
      {
        path: "my-delivery-list",
        element: (
          <PrivateRoute>
            <MyDeliveryList />
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      // ADMIN
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <AdminStatistics />
          </PrivateRoute>
        ),
      },
      {
        path: "all-parcel",
        element: (
          <PrivateRoute>
            <AllParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AllUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "all-delivery-men",
        element: (
          <PrivateRoute>
            <AllDeliveryMan />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
