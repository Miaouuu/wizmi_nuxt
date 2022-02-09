import { Inject } from '@nuxt/types/app'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import apiAuth, { AuthRoute } from '~/api/auth'
import apiFeedbacks, { FeedbacksRoute } from '~/api/feedbacks'
import apiLevels, { LevelsRoute } from '~/api/levels'
import apiReleases, { ReleasesRoute } from '~/api/releases'
import apiWorlds, { WorldsRoute } from '~/api/worlds'

export interface ApiRoute {
  auth: AuthRoute
  feedbacks: FeedbacksRoute
  levels: LevelsRoute
  releases: ReleasesRoute
  worlds: WorldsRoute
}

export default ({ $axios }: { $axios: NuxtAxiosInstance }, inject: Inject) => {
  const api: ApiRoute = {
    auth: apiAuth($axios),
    feedbacks: apiFeedbacks($axios),
    levels: apiLevels($axios),
    releases: apiReleases($axios),
    worlds: apiWorlds($axios)
  }

  inject('api', api)
}
