import { CreateFeedbackInput, Feedbacks } from 'wizmi'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export interface FeedbacksRoute{
  getFeedbacks: () => Promise<Feedbacks[]>
  postFeedback: (feedbackInput: CreateFeedbackInput) => Promise<{ok: Boolean}>
  validateFeedback: (id: number) => Promise<{ok: Boolean}>
  deleteFeedback: (id: number) => Promise<{ok: Boolean}>
}

export default ($axios: NuxtAxiosInstance): FeedbacksRoute => ({
  async getFeedbacks (): Promise<Feedbacks[]> {
    try {
      const response = await $axios.get('/feedbacks')
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  },
  async postFeedback (feedbackInput: CreateFeedbackInput): Promise<{ok: Boolean}> {
    try {
      const response = await $axios.post('/feedbacks', feedbackInput)
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  },
  async validateFeedback (id: number): Promise<{ok: Boolean}> {
    try {
      const response = await $axios.post(`/feedbacks/${id}/validate`)
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  },
  async deleteFeedback (id: number): Promise<{ok: Boolean}> {
    try {
      const response = await $axios.delete(`/feedbacks/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  }
})
