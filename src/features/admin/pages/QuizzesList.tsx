import { useEffect, useState } from "react"
import { Plus, BookOpen } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { getAllQuizzesApi } from "../api/adminApi"

type Quiz = {
  publicId: string
  title: string
  totalQuestions: number
}

export default function QuizzesList() {
  const navigate = useNavigate()

  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(false)

  const fetchQuizzes = async () => {
    try {
      setLoading(true)

      const response = await getAllQuizzesApi()

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quizzes</h2>

          <p className="text-sm text-muted-foreground">
            Create and manage quizzes
          </p>
        </div>

        <Button onClick={() => navigate("/admin/quizzes/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Quiz
        </Button>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading...</p>}

      {!loading && quizzes.length === 0 && (
        <p className="text-sm text-muted-foreground">No quizzes found.</p>
      )}

      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.publicId}
            className="cursor-pointer rounded-2xl transition hover:border-primary"
            onClick={() => navigate(`/admin/quizzes/${quiz.publicId}`)}
          >
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">{quiz.title}</h3>
                </div>
              </div>

              <Badge variant="outline">{quiz.totalQuestions} Questions</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
