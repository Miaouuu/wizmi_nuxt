import { Levels } from 'wizmi'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default ($axios: NuxtAxiosInstance) => ({
  async getLevels (): Promise<Levels[]> {
    try {
      const response = await $axios.get('/levels')
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  },
  async getLevelById (id: string): Promise<Levels> {
    try {
      const response = await $axios.get(`/levels/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  }
})
