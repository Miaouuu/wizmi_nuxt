import { Worlds } from 'wizmi'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export interface WorldsRoute {
  getWorlds: () => Promise<Worlds[]>
}

export default ($axios: NuxtAxiosInstance) => ({
  async getWorlds (): Promise<Worlds[]> {
    try {
      const response = await $axios.get('/worlds')
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  }
})