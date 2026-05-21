import { useEffect, useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { updateQuestionApi } from "../api/adminApi"

type AnswerType = "RADIO" | "CHECKBOX" | "TEXT"

type Question = {
  publicId: string
  questionText: string
  answerType: AnswerType
  versionNumber: number
  options?: string[]
}

type EditQuestionModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  question: Question | null
  onSuccess: () => void
}

export default function EditQuestionModal({
  open,
  onOpenChange,
  question,
  onSuccess,
}: EditQuestionModalProps) {
  const [questionText, setQuestionText] = useState("")
  const [answerType, setAnswerType] = useState<AnswerType>("RADIO")
  const [options, setOptions] = useState<string[]>(["", ""])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (question) {
      setQuestionText(question.questionText)
      setAnswerType(question.answerType)

      if (question.answerType === "TEXT") {
        setOptions([])
      } else {
        setOptions(
          question.options && question.options.length > 0
            ? question.options
            : ["", ""]
        )
      }
    }
  }, [question])

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

  const handleSubmit = async () => {
    if (!question) return

    try {
      setLoading(true)

      await updateQuestionApi(question.publicId, {
        questionText,
        answerType,
        options:
          answerType === "TEXT"
            ? []
            : options.filter((option) => option.trim() !== ""),
      })

      toast.success("Question updated successfully")
      onOpenChange(false)
      onSuccess()
    } catch {
      toast.error("Failed to update question")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Question Text</label>
            <Textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="min-h-24 resize-none"
              placeholder="Enter question text"
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Options</h3>
                  <p className="text-xs text-muted-foreground">
                    Updating this will create a new question version.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Option
                </Button>
              </div>

              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
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
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Update Question"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
