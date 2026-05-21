import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import QuizCard from "../components/QuizCard"

import { getAllQuizzesForUserApi } from "../api/userApi"

type Quiz = {
  publicId: string
  title: string
  totalQuestions: number
}

const colors = [
  {
    color: "bg-blue-50 text-blue-700",
    borderColor: "border-blue-200",
  },
  {
    color: "bg-purple-50 text-purple-700",
    borderColor: "border-purple-200",
  },
  {
    color: "bg-green-50 text-green-700",
    borderColor: "border-green-200",
  },
  {
    color: "bg-orange-50 text-orange-700",
    borderColor: "border-orange-200",
  },
  {
    color: "bg-red-50 text-red-700",
    borderColor: "border-red-200",
  },
  {
    color: "bg-pink-50 text-pink-700",
    borderColor: "border-pink-200",
  },
]

export default function QuizList() {
  const navigate = useNavigate()

  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(false)

  const fetchQuizzes = async () => {
    try {
      setLoading(true)

      const response = await getAllQuizzesForUserApi()

      setQuizzes(response.data.data)
    } catch {
      toast.error("Failed to fetch quizzes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuizzes()
  }, [])

  return (
    <div className="space-y-8">
      {loading && (
        <p className="text-sm text-muted-foreground">Loading quizzes...</p>
      )}

      {!loading && quizzes.length === 0 && (
        <p className="text-sm text-muted-foreground">No quizzes available.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {quizzes.map((quiz, index) => (
          <QuizCard
            key={quiz.publicId}
            title={quiz.title}
            totalQuestions={quiz.totalQuestions}
            color={colors[index % colors.length].color}
            borderColor={colors[index % colors.length].borderColor}
            onClick={() => navigate(`/user/quizzes/${quiz.publicId}`)}
          />
        ))}
      </div>
    </div>
  )
}
