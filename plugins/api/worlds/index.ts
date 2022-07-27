import axios from 'axios'
import { Worlds } from 'wizmi'
import ApiHelper from '..'

export default class WorldsApiHelper extends ApiHelper {
  async getWorlds (): Promise<Worlds[]> {
    try {
      const response = await axios.get(this.apiRoute + '/worlds')
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  }
}
