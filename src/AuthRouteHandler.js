import React from "react";
import { Routes, Route } from "react-router-dom";

// Import the Auth layout
import AuthLayout from "layouts/Auth.js";  

// Import the routes configuration

import { authRouteConfig } from "authRouteConfig.js";  

const AuthRouteHandler = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />}> {/* Wrap routes with AuthLayout */}
        {authRouteConfig.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.component}  // Render login/register components
          />
        ))}
      </Route>
    </Routes>
  );
};

export default AuthRouteHandler;
