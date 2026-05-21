import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { getQuizByPublicIdApi } from "../api/adminApi"

type QuizOption = {
  publicId: string
  optionText: string
}

type QuizQuestion = {
  questionPublicId: string
  questionVersionPublicId: string
  questionText: string
  answerType: "RADIO" | "CHECKBOX" | "TEXT"
  versionNumber: number
  options: QuizOption[]
}

type QuizDetailsResponse = {
  publicId: string
  title: string
  questions: QuizQuestion[]
}

export default function QuizDetails() {
  const { publicId } = useParams()
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState<QuizDetailsResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchQuizDetails = async () => {
    if (!publicId) return

    try {
      setLoading(true)

      const response = await getQuizByPublicIdApi(publicId)

      setQuiz(response.data.data)
    } catch {
      toast.error("Failed to fetch quiz details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuizDetails()
  }, [publicId])

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading quiz...</p>
  }

  if (!quiz) {
    return <p className="text-sm text-muted-foreground">Quiz not found.</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <Button
            variant="ghost"
            className="mb-3 px-0"
            onClick={() => navigate("/admin/quizzes")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to quizzes
          </Button>

          <h2 className="text-2xl font-bold">{quiz.title}</h2>
        </div>

        <Badge variant="outline">{quiz.questions.length} Questions</Badge>
      </div>

      <div className="grid gap-4">
        {quiz.questions.map((question, index) => (
          <Card key={question.questionVersionPublicId} className="rounded-2xl">
            <CardContent className="space-y-4 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Question {index + 1}</Badge>

                <Badge>{question.answerType}</Badge>

                <Badge>Version {question.versionNumber}</Badge>
              </div>

              <h3 className="text-lg font-semibold">{question.questionText}</h3>

              {question.options.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Options</p>

                  <div className="flex flex-wrap gap-2">
                    {question.options.map((option) => (
                      <Badge key={option.publicId} variant="outline">
                        {option.optionText}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {question.answerType === "TEXT" && (
                <p className="text-sm text-muted-foreground">
                  This question expects a written answer.
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
