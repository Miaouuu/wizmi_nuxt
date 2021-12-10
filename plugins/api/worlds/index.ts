import axios from "axios";
import ApiHelper from ".."
import { Worlds } from "~/store/interfaces";

export default class WorldsApiHelper extends ApiHelper{
  async getWorlds(): Promise<Worlds[]> {
    try {
      const response: Worlds[] = await axios.get(this.apiRoute + '/worlds');
      return response
    } catch (error) {
      throw new Error('Oops')
    } 
  }
}

