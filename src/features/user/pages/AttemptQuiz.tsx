import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ConfirmSubmitModal from "../components/ConfirmSubmitModal"
import {
  getQuizByPublicIdForUserApi,
  submitQuizAttemptApi,
} from "../api/userApi"

type Option = {
  publicId: string
  optionText: string
}

type Question = {
  questionPublicId: string
  questionVersionPublicId: string
  questionText: string
  answerType: string
  versionNumber: number
  options: Option[]
}

type QuizDetail = {
  publicId: string
  title: string
  questions: Question[]
}

type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function QuizAttempt() {
  const { publicId } = useParams()
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState<QuizDetail | null>(null)
  const [question, setQuestion] = useState<Question | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)

  const [page, setPage] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const limit = 1

  const fetchQuizQuestion = async () => {
    if (!publicId) return

    try {
      setLoading(true)

      const response = await getQuizByPublicIdForUserApi(publicId, page, limit)

      setQuiz(response.data.data)
      setQuestion(response.data.data.questions[0])
      setPagination(response.data.pagination)
    } catch {
      toast.error("Failed to fetch quiz")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuizQuestion()
  }, [publicId, page])

  const handleSingleAnswer = (
    questionVersionPublicId: string,
    optionPublicId: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionVersionPublicId]: [optionPublicId],
    }))
  }

  const handleClearAnswer = () => {
    if (!question) return

    setAnswers((prev) => {
      const copy = { ...prev }
      delete copy[question.questionVersionPublicId]
      return copy
    })
  }

  const handleSubmit = async () => {
    if (!publicId) return

    try {
      setSubmitting(true)

      const payload = {
        answers: Object.entries(answers).map(
          ([questionVersionPublicId, selectedOptionPublicIds]) => ({
            questionVersionPublicId,
            selectedOptionPublicIds,
          })
        ),
      }

      await submitQuizAttemptApi(publicId, payload)

      toast.success("Quiz submitted successfully")
      navigate("/user/attempts")
    } catch {
      toast.error("Failed to submit quiz")
    } finally {
      setSubmitting(false)
    }
    setConfirmOpen(false)
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading quiz...</p>
  }

  if (!quiz || !question || !pagination) {
    return <p className="text-sm text-muted-foreground">No questions found.</p>
  }

  const selectedOptions = answers[question.questionVersionPublicId] || []

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b p-6">
            <div>
              <h2 className="font-semibold">Q{pagination.page}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{quiz.title}</p>
            </div>

            <p className="font-medium text-purple-600">1 mark</p>
          </div>

          <div className="space-y-6 p-6">
            <p className="text-lg leading-8 font-medium">
              {question.questionText}
            </p>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const label = String.fromCharCode(65 + index)
                const selected = selectedOptions.includes(option.publicId)

                return (
                  <button
                    key={option.publicId}
                    onClick={() =>
                      handleSingleAnswer(
                        question.questionVersionPublicId,
                        option.publicId
                      )
                    }
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "hover:bg-muted"
                    }`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold">
                      {label}
                    </span>

                    <span>
                      {label}) {option.optionText}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between border-t p-6">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              disabled={selectedOptions.length === 0}
              onClick={handleClearAnswer}
            >
              Clear Answer
            </Button>

            <Button
              disabled={page === pagination.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit rounded-2xl shadow-sm">
        <CardContent className="space-y-5 p-6">
          <h2 className="text-xl font-bold">Submit Quiz</h2>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Total Questions: {pagination.total}</p>
            <p>Answered: {Object.keys(answers).length}</p>
            <p>Unanswered: {pagination.total - Object.keys(answers).length}</p>
          </div>

          <Button
            disabled={submitting}
            onClick={() => setConfirmOpen(true)}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Submit Quiz
          </Button>
        </CardContent>
      </Card>

      <ConfirmSubmitModal
        open={confirmOpen}
        submitting={submitting}
        onOpenChange={setConfirmOpen}
        onConfirm={handleSubmit}
      />
    </div>
  )
}
