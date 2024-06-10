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
import AdminRoute from "./AdminRoute";
import DeliverymenRoute from "./DeliverymenRoute";
import CheckOutPage from "../pages/Dashboard/User/CheckOutPage";
import PaymentSuccessPage from "../pages/Dashboard/User/PaymentSuccessPage";

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
        path: "profile",
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
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <CheckOutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccessPage />
          </PrivateRoute>
        ),
      },

      // DELIVERY MAN
      {
        path: "my-delivery-list",
        element: (
          <PrivateRoute>
            <DeliverymenRoute>
              <MyDeliveryList />
            </DeliverymenRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <DeliverymenRoute>
              <MyReviews />
            </DeliverymenRoute>
          </PrivateRoute>
        ),
      },

      // ADMIN
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminStatistics />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-parcel",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllParcel />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-delivery-men",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllDeliveryMan />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
