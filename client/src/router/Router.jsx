import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import AllProperty from "../pages/all property/AllProperty";
import PropertyDetailsPage from "../pages/property details page/PropertyDetailsPage";
import AllAgency from "../pages/all agency/AllAgency";
import AgencyProfile from "../pages/agency profile/AgencyProfile";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import AddProperty from "../pages/dashboard/dashboard component/AddProperty";
import ManageProperty from "../pages/dashboard/dashboard component/ManageProperty";
import ManageUsers from "../pages/dashboard/dashboard component/ManageUsers";
import SellerManageProperty from "../pages/dashboard/dashboard component/SellerManageProperty";
import BuyerFavourites from "../pages/dashboard/dashboard component/BuyerFavourites";
import AdminRoute from "./AdminRoute";
import PropertyRequest from "../pages/dashboard/dashboard component/PropertyRequest";
import UpdatePropertyDetails from "../pages/dashboard/dashboard component/UpdatePropertyDetails";
import ManageAgencies from "../pages/dashboard/dashboard component/ManageAgencies";
import BuyerAppointment from "../pages/dashboard/dashboard component/BuyerAppointment";
import AppointmentRequest from "../pages/dashboard/dashboard component/AppointmentRequest";
import AppointmentCandidates from "../pages/dashboard/dashboard component/AppointmentCandidates";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/contact/Contact";
import Profile from "../pages/profile/Profile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <div>Error occurred!</div>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-property",
        element: <AllProperty></AllProperty>,
      },
      {
        path: "/all-property/:id",
        element: (
          <PrivateRoute>
            <PropertyDetailsPage></PropertyDetailsPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-agency",
        element: <AllAgency></AllAgency>,
      },
      {
        path: "/all-agency/:id",
        element: (
          <PrivateRoute>
            <AgencyProfile></AgencyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path:'/blog',
        element:<Blog></Blog>
      },
      {
        path:'/contact',
        element:<Contact></Contact>
      },{
        path:'/profile',
        element:<PrivateRoute><Profile></Profile></PrivateRoute>
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "seller/add-property",
        element: <AddProperty></AddProperty>,
      },
      {
        path: "/dashboard/manage-properties",
        element:<ManageProperty></ManageProperty>
      },
      {
        path:'/dashboard/manage-users',
        element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path:'/dashboard/seller/manage-properties',
        element:<SellerManageProperty></SellerManageProperty>
      },
      {
        path:"/dashboard/favourites",
        element:<BuyerFavourites></BuyerFavourites>
      },
      {
        path:'/dashboard/property-requests',
        element:<AdminRoute><PropertyRequest></PropertyRequest></AdminRoute>
      },
      {
        path:'/dashboard/updateProperty/:id',
        element:<UpdatePropertyDetails></UpdatePropertyDetails>,
      },
      {
        path:'/dashboard/manage-agencies',
        element:<AdminRoute><ManageAgencies></ManageAgencies></AdminRoute>
      },
      {
        path:'/dashboard/buyer/appointments',
        element:<BuyerAppointment></BuyerAppointment>
      },
      {
        path:'/dashboard/seller/manage-appointments',
        element:<AppointmentRequest></AppointmentRequest>
      },
      {
        path:'/dashboard/property-appointments/:id',
        element:<AppointmentCandidates></AppointmentCandidates>
      }
    ],
  },
]);
export default router;
