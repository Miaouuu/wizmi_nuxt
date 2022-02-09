import { Releases } from 'wizmi'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export interface ReleasesRoute{
  getReleases: () => Promise<Releases[]>
  getReleaseWithChangelogs: (id: string) => Promise<Releases>
}

export default ($axios: NuxtAxiosInstance): ReleasesRoute => ({
  async getReleases (): Promise<Releases[]> {
    try {
      const response = await $axios.get('/releases')
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  },
  async getReleaseWithChangelogs (id: string): Promise<Releases> {
    try {
      const response = await $axios.get(`/releases/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  }
})
