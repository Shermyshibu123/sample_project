import axios, { AxiosRequestConfig } from 'axios';
import authStore from '../Store/authStore';
import Constant from '../Global/Constant';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;

class API {
  constructor() {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    axios.interceptors.request.use(
      (config) => {
        const token = Cookies.get(Constant.token) as string;
        if (token) {
          const item = { ...config };
          item.headers.Authorization = `Bearer ${token}`;
          return item;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (responseInter) => {
        return responseInter;
      },(error) => {
        if (error?.response?.status === 403 ) {
            authStore.signOut();
        }
        return error
      }
    );
  }

  async get(url: string, config?: AxiosRequestConfig) {
    return axios.get(url, config);
  }

  async post(url: string, data: any) {
    return axios.post(url, data);
  }

  async put(url: string, data: any) {
    return axios.put(url, data);
  }

  async delete(url: string) {
    return axios.delete(url);
  }
}

export default new API();
