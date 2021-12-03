import axios from 'axios'
const RECEIVERDATA_BASE_REST_API_URL="http://localhost:8093/api/v1/receiverdata";
class receiverDataService{
getReceiverDataById(){
return axios.get(RECEIVERDATA_BASE_REST_API_URL);





}
}
export default new ReceiverdataService();