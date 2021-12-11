import axios from "axios";
import ApiHelper from ".."
import { Levels } from "~/store/interfaces";

export default class LevelsApiHelper extends ApiHelper{

  async getLevels(): Promise<Levels[]> {
    try {
      const response: Levels[] = await axios.get(this.apiRoute + '/levels');
      return response
    } catch (error) {
      throw new Error('Oops')
    } 
  }

  async getLevelById(id: string): Promise<Levels>  {
    try {
      const response: Levels = await axios.get(this.apiRoute + `/levels/${id}`);
      return response
    } catch (error) {
      throw new Error('Oops')
    } 
  }
}