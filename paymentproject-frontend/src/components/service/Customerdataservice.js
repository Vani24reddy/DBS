import axios from 'axios'
const CUSTOMERDATA_BASE_REST_API_URL="http://localhost:8093/api/v1/internaldata";
class Customerdataservice{
getCustomerdataById(){
return axios.get(CUSTOMERDATA_BASE_REST_API_URL);





}
}
export default new Customerdataservice();