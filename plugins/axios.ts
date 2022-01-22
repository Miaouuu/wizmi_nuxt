import { Inject } from '@nuxt/types/app'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import apiLevels from '~/api/levels'
import apiWorlds from '~/api/worlds'

export default ({ $axios }: {$axios: NuxtAxiosInstance}, inject: Inject) => {
  const api = {
    levels: apiLevels($axios),
    worlds: apiWorlds($axios)
  }

  inject('api', api)
}
