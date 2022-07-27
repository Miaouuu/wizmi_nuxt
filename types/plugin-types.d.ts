// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'
import { ApiRoute } from '@/plugins/axios'

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiRoute
  }
}
