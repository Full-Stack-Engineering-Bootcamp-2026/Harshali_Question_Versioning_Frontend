import API from "@/api/axios"

export const getAllQuizzesForUserApi = () => {
  return API.get("/quiz")
}

export const getQuizByPublicIdForUserApi = (publicId: string) => {
  return API.get(`/quiz/${publicId}`)
}
