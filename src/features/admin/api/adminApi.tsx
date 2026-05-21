import API from "@/api/axios"

export const getAllQuestionsApi = () => {
  return API.get("/questions")
}

export const getQuestionByPublicIdApi = (publicId: string) => {
  return API.get(`/questions/${publicId}`)
}

export const createQuestionApi = (data: {
  questionText: string
  answerType: "RADIO" | "CHECKBOX" | "TEXT"
  options?: string[]
}) => {
  return API.post("/questions", data)
}

export const updateQuestionApi = (
  publicId: string,
  data: {
    questionText: string
    answerType: "RADIO" | "CHECKBOX" | "TEXT"
    options?: string[]
  }
) => {
  return API.patch(`/questions/${publicId}`, data)
}
