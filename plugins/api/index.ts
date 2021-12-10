export default class ApiHelper {
  // Put every config / header function here

  apiRoute: string
  userTokenId: string

  constructor () {
    this.apiRoute = 'https://wizmi-dev.miaou.land'
    this.userTokenId = ''
  }

  setUserTokenId (userTokenId: string) {
    this.userTokenId = userTokenId
  }
}
