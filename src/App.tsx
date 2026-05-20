import { Routes, Route } from "react-router-dom"

import LoginPage from "./features/shared/LoginPage"
//import RegisterPage from "./features/shared/RegisterPage";

import AppLayout from "./layouts/AppLayout"

import ProtectedRoute from "./routes/ProtectedRoute"
import PublicRoute from "./routes/PublicRoute"

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
      </Route>

      {/* ADMIN */}
      <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
        <Route path="/admin" element={<AppLayout role="ADMIN" />}>
          <Route index element={<div>Admin Dashboard</div>} />
        </Route>
      </Route>

      {/* USER */}
      <Route element={<ProtectedRoute allowedRole="USER" />}>
        <Route path="/user" element={<AppLayout role="USER" />}>
          <Route index element={<div>User Dashboard</div>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
