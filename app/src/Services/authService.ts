/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import api from './api';

class AuthService {
  login = async (data : any) => api.post('/user/login', data);

  forgotPasswordRequest = async (email: string) => api.post('/request/resetPassword', { email });

  resetPassword = async (data: any) => api.post('/request/changePassword', data);
  signOut = async(data?: any) => api.post('/user/signout', data);
  fakeLogin = async () => api.post('/user/fakelogin',null);
}

export default new AuthService();
