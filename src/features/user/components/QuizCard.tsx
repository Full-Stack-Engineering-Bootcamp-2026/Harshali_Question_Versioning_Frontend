import { ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

type QuizCardProps = {
  title: string
  totalQuestions: number
  onClick: () => void
  color: string
  borderColor: string
}

export default function QuizCard({
  title,
  totalQuestions,
  onClick,
  color,
  borderColor,
}: QuizCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer rounded-3xl border-2 shadow-none transition hover:scale-[1.01] ${color} ${borderColor}`}
    >
      <CardContent className="space-y-5 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold">{title}</h3>

            <p className="mt-4 text-base">Click to start exam</p>
          </div>

          <ArrowRight className="h-7 w-7" />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Not started yet</p>

          <p className="text-lg font-semibold">{totalQuestions} questions</p>
        </div>

        <div className="h-2 w-full rounded-full bg-black/10" />
      </CardContent>
    </Card>
  )
}
