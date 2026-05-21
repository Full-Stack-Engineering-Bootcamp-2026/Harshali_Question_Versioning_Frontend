import API from "@/api/axios"

export const getAllQuizzesForUserApi = (page: number, limit: number) => {
  return API.get("/quiz", {
    params: {
      page,
      limit,
    },
  })
}

export const getQuizByPublicIdForUserApi = (
  publicId: string,
  page: number,
  limit: number
) => {
  return API.get(`/quiz/${publicId}`, {
    params: {
      page,
      limit,
    },
  })
}
export const submitQuizAttemptApi = (
  quizPublicId: string,
  data: {
    answers: {
      questionVersionPublicId: string
      selectedOptionPublicIds?: string[]
      textAnswer?: string
    }[]
  }
) => {
  return API.post(`/quiz-attempt/quizzes/${quizPublicId}/attempt`, data)
}
