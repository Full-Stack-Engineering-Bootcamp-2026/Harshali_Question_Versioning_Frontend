import { useEffect, useState } from "react"
import { Pencil, Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { getAllQuestionsApi } from "../api/adminApi"

type Question = {
  publicId: string
  questionText: string
  answerType: "RADIO" | "CHECKBOX" | "TEXT"
  versionNumber: number
  options?: string[]
}

export default function QuestionsList() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Questions</h2>
          <p className="text-sm text-muted-foreground">
            Manage question bank and versions
          </p>
        </div>

        <Button onClick={() => navigate("/admin/questions/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Question
        </Button>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading...</p>}

      {!loading && questions.length === 0 && (
        <p className="text-sm text-muted-foreground">No questions found.</p>
      )}

      <div className="grid gap-4">
        {questions.map((question) => (
          <Card key={question.publicId} className="rounded-2xl">
            <CardContent className="flex items-start justify-between gap-4 p-5">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{question.answerType}</Badge>

                  <Badge variant="outline">
                    Version {question.versionNumber}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold">
                  {question.questionText}
                </h3>

                {question.options && question.options.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {question.options.map((option) => (
                      <Badge key={option} variant="secondary">
                        {option}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
