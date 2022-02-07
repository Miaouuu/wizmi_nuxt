import { Context } from '@nuxt/types'
import { Auth } from '@nuxtjs/auth-next'
import { Roles } from 'wizmi'

export default function ({ $auth, redirect }: { $auth: Auth, redirect: Context['redirect'] }) {
  if (!$auth.loggedIn || !$auth.user) {
    return redirect('/account/login')
  }
  const roles = $auth.user.roles as Roles[]
  if (!roles.includes(Roles.ADMIN)) {
    return redirect('/')
  }
}
