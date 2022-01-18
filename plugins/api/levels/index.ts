import axios from 'axios'
import ApiHelper from '..'
import { Levels } from '~/store/interfaces'

export default class LevelsApiHelper extends ApiHelper {
  async getLevels (): Promise<Levels[]> {
    try {
      console.log('ok')
      const response = await axios.get(this.apiRoute + '/levels')
      console.log(response.data)
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  }

  async getLevelById (id: string): Promise<Levels> {
    try {
      console.log('ok')
      const response = await axios.get(this.apiRoute + `/levels/${id}`)
      console.log(response.data)
      return response.data
    } catch (error) {
      throw new Error('Oops')
    }
  }
}
