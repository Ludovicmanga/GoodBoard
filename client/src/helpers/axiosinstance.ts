import http from 'http';

import axios from 'axios';
import { AxiosInstance } from 'axios';
const BASE_URL = 'https://goodboard-app.herokuapp.com/api';
const httpAgent = new http.Agent();
axios.defaults.httpAgent = httpAgent;

export class AxiosInst {
  private static inst: AxiosInstance;

  private constructor() {}

  public static getInst(): AxiosInstance {
    if (!AxiosInst.inst) {
      AxiosInst.inst = axios.create({
        withCredentials: true,
        baseURL: BASE_URL,
      });
    }

    return AxiosInst.inst;
  }
}
