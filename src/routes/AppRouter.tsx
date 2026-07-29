import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Tasks from '../pages/Tasks';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<Tasks />} />
        </Route>

        {/* Redirect Root Route */}
        <Route path="/" element={<Navigate to="/tasks" replace />} />

        {/* Fallback Catch All */}
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
