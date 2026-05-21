import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import QuizCard from "../components/QuizCard"
import { getAllQuizzesForUserApi } from "../api/userApi"

type Quiz = {
  publicId: string
  title: string
  totalQuestions: number
}

type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
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
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<Pagination | null>(null)

  const limit = 6

  const fetchQuizzes = async () => {
    try {
      setLoading(true)

      const response = await getAllQuizzesForUserApi(page, limit)

      setQuizzes(response.data.data)
      setPagination(response.data.pagination)
    } catch {
      toast.error("Failed to fetch quizzes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuizzes()
  }, [page])

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

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <p className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}
          </p>

          <Button
            variant="outline"
            disabled={page === pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
