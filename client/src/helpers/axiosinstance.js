import http from 'http';
import axios from 'axios';
var BASE_URL = 'https://goodboard-app.herokuapp.com/api';
var httpAgent = new http.Agent();
axios.defaults.httpAgent = httpAgent;
var AxiosInst = /** @class */ (function () {
    function AxiosInst() {
    }
    AxiosInst.getInst = function () {
        if (!AxiosInst.inst) {
            AxiosInst.inst = axios.create({
                withCredentials: true,
                baseURL: BASE_URL
            });
        }
        return AxiosInst.inst;
    };
    return AxiosInst;
}());
export { AxiosInst };
