import React, { useContext }  from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import { AuthContext } from "./AuthContext";

function ProtectedRoute() {
  const {isAuth} = useContext(AuthContext);
  return isAuth ? <Outlet /> : <Navigate to="/login"/>
}

export default ProtectedRoute;