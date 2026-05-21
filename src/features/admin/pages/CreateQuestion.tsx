import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { createQuestionApi } from "../api/adminApi"

type AnswerType = "RADIO" | "CHECKBOX" | "TEXT"

export default function CreateQuestion() {
  const navigate = useNavigate()

  const [questionText, setQuestionText] = useState("")
  const [answerType, setAnswerType] = useState<AnswerType>("RADIO")
  const [options, setOptions] = useState<string[]>(["", ""])
  const [loading, setLoading] = useState(false)

  const addOption = () => {
    setOptions([...options, ""])
  }

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options]
    updatedOptions[index] = value
    setOptions(updatedOptions)
  }

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  const handleAnswerTypeChange = (value: AnswerType) => {
    setAnswerType(value)

    if (value === "TEXT") {
      setOptions([])
      return
    }

    if (options.length === 0) {
      setOptions(["", ""])
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const payload = {
        questionText,
        answerType,
        options:
          answerType === "TEXT"
            ? []
            : options.filter((option) => option.trim() !== ""),
      }

      await createQuestionApi(payload)

      toast.success("Question created successfully")
      navigate("/admin/questions")
    } catch {
      toast.error("Failed to create question")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create Question</h2>
        <p className="text-sm text-muted-foreground">
          Add a new question to the question bank
        </p>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Question Text</label>
            <Textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Untitled question"
              className="min-h-28 resize-none text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Answer Type</label>

            <Select value={answerType} onValueChange={handleAnswerTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select answer type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="RADIO">Single select</SelectItem>
                <SelectItem value="CHECKBOX">Multi select</SelectItem>
                <SelectItem value="TEXT">Text answer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {answerType !== "TEXT" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Options</h3>
                <p className="text-xs text-muted-foreground">
                  Add choices for radio or checkbox questions
                </p>
              </div>

              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border text-sm text-muted-foreground">
                      {index + 1}
                    </div>

                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />

                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button type="button" variant="outline" onClick={addOption}>
                <Plus className="mr-2 h-4 w-4" />
                Add Option
              </Button>
            </div>
          )}

          {answerType === "TEXT" && (
            <div className="rounded-xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                User will type the answer in a textarea.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 border-t pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/questions")}
            >
              Cancel
            </Button>

            <Button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
