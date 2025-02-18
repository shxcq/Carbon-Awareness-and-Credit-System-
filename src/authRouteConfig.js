// authRouteConfig.js
import Login from "views/examples/Login.js";  // Import Login component
import Register from "views/examples/Register.js";  // Import Register component

// Define the auth routes here
const authRouteConfig = [
  {
    path: "/login",  // Route for login page
    name: "Login",  // Route name
    component: <Login />,  // Component to render
    layout: "/auth",  // Specifies that it's an /auth route
  },
  {
    path: "/register",  // Route for register page
    name: "Register",  // Route name
    component: <Register />,  // Component to render
    layout: "/auth",  // Specifies that it's an /auth route
  },
];

export default authRouteConfig;
