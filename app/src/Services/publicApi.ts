/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import axios, { AxiosRequestConfig } from 'axios';
class PublicAPI {
  constructor() {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    axios.interceptors.request.use(
      (config) => {
       return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    axios.interceptors.response.use((response) => response, (error) => {
      return Promise.reject(error);
    });
  }

  async get(url:string, config?:AxiosRequestConfig) {
    return axios.get(url, config);
  }

  async post(url: string, data: any, config?:AxiosRequestConfig) {
    return axios.post(url, data, config);
  }

  async put(url: string, data: any, config?:AxiosRequestConfig) {
    return axios.put(url, data,config);
  }

  async delete(url: string) {
    return axios.delete(url);
  }
}

export default new PublicAPI();
