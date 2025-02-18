import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Tables from "views/examples/Tables.js";
import ProtectedRoute from "./ProtectedRoute"; // Import Protected Route
import CarbonFootprintInput from "views/examples/CarbonFootprintInput";

console.log("Loading routes..."); // Log when routes.js is loaded

var routes = [
  {
    path: "/index",
    name: "EcoCred",
    icon: "ni ni-tv-2 text-primary",
    component: <ProtectedRoute component={<Index />} />,
    layout: "/admin",
  },

  {
    path: "/footprints",
    name: "Carbon-Tracking",
    icon: "ni ni-bullet-list-67 text-red",
    component: <ProtectedRoute component={<CarbonFootprintInput />} />,
    layout: "/admin",
  },
  
  {
    path: "/tables",
    name: "Carbon Actions Log (Activity Log)",
    icon: "ni ni-bullet-list-67 text-red",
    component: <ProtectedRoute component={<Tables />} />,
    layout: "/admin",
  },

  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <ProtectedRoute component={<Profile />} />,
    layout: "/admin",
  },
];

console.log("Routes initialized:", routes); // Log the routes array

export default routes;
