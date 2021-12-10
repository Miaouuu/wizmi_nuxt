import axios from "axios";
import ApiHelper from ".."

export default class WorldsApiHelper extends ApiHelper{

  getWorlds() {
    axios.get(this.apiRoute + '/worlds')
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

