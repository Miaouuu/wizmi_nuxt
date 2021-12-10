import axios from "axios";
import ApiHelper from ".."

export default class LevelsApiHelper extends ApiHelper{
  getLevels() {
    axios.get(this.apiRoute + '/levels')
    .then(function (response) {
      console.log(response);
      return response.data
    })
    .catch(function (error) {
      console.log(error);
      return error
    })
  };

  getLevel(id: string) {
    axios.get(this.apiRoute + `/levels/${id}`)
    .then(function (response) {
      console.log(response);
      return response.data
    })
    .catch(function (error) {
      console.log(error);
      return error
    })
  }
}