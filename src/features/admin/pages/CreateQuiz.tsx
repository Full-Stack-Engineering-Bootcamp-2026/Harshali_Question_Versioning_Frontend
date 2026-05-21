import { useEffect, useState } from "react"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import { createQuizApi, getAllQuestionsApi } from "../api/adminApi"

type Question = {
  publicId: string
  questionText: string
  answerType: "RADIO" | "CHECKBOX" | "TEXT"
  versionNumber: number
  options?: string[]
}

export default function CreateQuiz() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const fetchQuestions = async () => {
    try {
      setLoading(true)

      const response = await getAllQuestionsApi()

      setQuestions(response.data.data)
    } catch {
      toast.error("Failed to fetch questions")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const addQuestion = (question: Question) => {
    const alreadySelected = selectedQuestions.some(
      (item) => item.publicId === question.publicId
    )

    if (alreadySelected) {
      toast.error("Question already selected")
      return
    }

    setSelectedQuestions([...selectedQuestions, question])
  }

  const removeQuestion = (publicId: string) => {
    setSelectedQuestions(
      selectedQuestions.filter((question) => question.publicId !== publicId)
    )
  }

  const handleCreateQuiz = async () => {
    if (!title.trim()) {
      toast.error("Quiz title is required")
      return
    }

    if (selectedQuestions.length === 0) {
      toast.error("Select at least one question")
      return
    }

    try {
      setSubmitting(true)

      await createQuizApi({
        title,
        questionPublicIds: selectedQuestions.map(
          (question) => question.publicId
        ),
      })

      toast.success("Quiz created successfully")

      navigate("/admin/quizzes")
    } catch {
      toast.error("Failed to create quiz")
    } finally {
      setSubmitting(false)
    }
  }

  const availableQuestions = questions.filter(
    (question) =>
      !selectedQuestions.some(
        (selected) => selected.publicId === question.publicId
      )
  )

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          className="mb-3 px-0"
          onClick={() => navigate("/admin/quizzes")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to quizzes
        </Button>

        <h2 className="text-2xl font-bold">Create Quiz</h2>

        <p className="text-sm text-muted-foreground">
          Add quiz title and select questions
        </p>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="space-y-2 p-5">
          <label className="text-sm font-medium">Quiz Title</label>

          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Available Questions</h3>

                <p className="text-sm text-muted-foreground">
                  Pick questions for the quiz
                </p>
              </div>

              <Badge variant="outline">{availableQuestions.length}</Badge>
            </div>

            {loading && (
              <p className="text-sm text-muted-foreground">
                Loading questions...
              </p>
            )}

            <div className="space-y-3">
              {availableQuestions.map((question) => (
                <Card key={question.publicId} className="rounded-xl">
                  <CardContent className="space-y-3 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{question.answerType}</Badge>

                      <Badge>Version {question.versionNumber}</Badge>
                    </div>

                    <h4 className="font-medium">{question.questionText}</h4>

                    {question.options && question.options.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {question.options.map((option) => (
                          <Badge key={option} variant="secondary">
                            {option}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addQuestion(question)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Question
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {!loading && availableQuestions.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No available questions.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Selected Questions</h3>
              </div>

              <Badge variant="outline">{selectedQuestions.length}</Badge>
            </div>

            <div className="space-y-3">
              {selectedQuestions.map((question, index) => (
                <Card
                  key={question.publicId}
                  className="rounded-xl border-primary/40"
                >
                  <CardContent className="space-y-3 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">Q{index + 1}</Badge>

                        <Badge>{question.answerType}</Badge>

                        <Badge>Version {question.versionNumber}</Badge>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQuestion(question.publicId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <h4 className="font-medium">{question.questionText}</h4>
                  </CardContent>
                </Card>
              ))}

              {selectedQuestions.length === 0 && (
                <div className="rounded-xl border border-dashed p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No questions selected yet.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button variant="outline" onClick={() => navigate("/admin/quizzes")}>
          Cancel
        </Button>

        <Button onClick={handleCreateQuiz} disabled={submitting}>
          {submitting ? "Creating..." : "Create Quiz"}
        </Button>
      </div>
    </div>
  )
}
