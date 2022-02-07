import { Inject } from '@nuxt/types/app'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import apiAuth, { AuthRoute } from '~/api/auth'
import apiFeedbacks, { FeedbacksRoute } from '~/api/feedbacks'
import apiLevels, { LevelsRoute } from '~/api/levels'
import apiWorlds, { WorldsRoute } from '~/api/worlds'

export interface ApiRoute {
  levels: LevelsRoute
  worlds: WorldsRoute
  auth: AuthRoute
  feedbacks: FeedbacksRoute
}

export default ({ $axios }: { $axios: NuxtAxiosInstance }, inject: Inject) => {
  const api: ApiRoute = {
    levels: apiLevels($axios),
    worlds: apiWorlds($axios),
    auth: apiAuth($axios),
    feedbacks: apiFeedbacks($axios)
  }

  inject('api', api)
}
