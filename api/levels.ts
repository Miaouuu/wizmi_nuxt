import { Levels } from 'wizmi'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export interface LevelsRoute{
  getLevels: () => Promise<Levels[]>
  getLevelById: (id: string) => Promise<Levels>
}

export default ($axios: NuxtAxiosInstance): LevelsRoute => ({
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
