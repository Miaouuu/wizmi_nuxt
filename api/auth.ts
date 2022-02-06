import { RegisterUserInput } from 'wizmi'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export interface AuthRoute {
  register: (registerInput: RegisterUserInput) => Promise<{ok: Boolean}>
}

export default ($axios: NuxtAxiosInstance) => ({
  async register (registerInput: RegisterUserInput): Promise<{ok: Boolean}> {
    try {
      const response = await $axios.post('/auth/register', registerInput)
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  }
})
