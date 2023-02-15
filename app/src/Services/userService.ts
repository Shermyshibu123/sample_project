import api from './api';

class UserService {
  getUsers = async (pageNumber?: number, count?: number) => {
    try {
      const getCount = count !== undefined ? (`count=${count}&`) : '';
      const getPageNumber = pageNumber !== undefined ? (`pageNumber=${pageNumber}`) : '';
      const response = await api.get(
        `/user?${getCount}`
        + `${getPageNumber}`,
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getUserDetails = async(email: string) => {
    try{
      const response = await api.get(
        '/user'
      );
      return Promise.resolve(response);
    }catch(error) {
      return Promise.reject(error);
    }
  }
   
  createUser = async (user: { email: string, name: string, roleId: string }) => {
    try {
      const response = await api.post('/user', user);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  updateUser = async (id: string,
    user: { id: string, email: string, name: string, roleId: string }) => {
    try {
      const response = await api.put(`/user/${id}`, user);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  deleteUser = async (id: string) => {
    try {
      const response = await api.delete(`/user/${id}`);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getSearchResult = async (searchText: string, pageNumber?: number, count?: number) => {
    try {
      const searchCount = count !== undefined ? (`count=${count}&`) : '';
      const searchPageNumber = pageNumber !== undefined ? (`pageNumber=${pageNumber}`) : '';
      const response = await api.get(
        `/user/search?query=${encodeURIComponent(searchText)}&`
        + `${searchCount}`
        + `${searchPageNumber}`,
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  resendPassword = async (data: { userId: string, email: string, name: string }) => api.post('/user/resendPassword', data)
}

export default new UserService();
