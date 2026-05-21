import { Routes, Route } from "react-router-dom"

import LoginPage from "./features/shared/LoginPage"

import AppLayout from "./layouts/AppLayout"

import ProtectedRoute from "./routes/ProtectedRoute"
import PublicRoute from "./routes/PublicRoute"
import QuestionsList from "./features/admin/pages/QuestionsList"
import CreateQuestion from "./features/admin/pages/CreateQuestion"
import QuizzesList from "./features/admin/pages/QuizzesList"
import CreateQuiz from "./features/admin/pages/CreateQuiz"
import QuizDetails from "./features/admin/pages/QuizDetails"
function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
        <Route path="/admin" element={<AppLayout role="ADMIN" />}>
          <Route index element={<div>Admin Dashboard</div>} />

          <Route path="questions" element={<QuestionsList />} />
          <Route path="questions/create" element={<CreateQuestion />} />
          <Route path="quizzes" element={<QuizzesList />} />
          <Route path="quizzes/:publicId" element={<QuizDetails />} />
          <Route path="quizzes/create" element={<CreateQuiz />} />
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
