import api from './api';

class UserRoleService {
  createUserRole = async (userRole: any) => {
    try {
      const response = await api.post('/userRole', userRole);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getUserRoles = async (pageNumber?: number, count?: number) => {
    try {
      const getCount = count !== undefined ? (`count=${count}&`) : '';
      const getPageNumber = pageNumber !== undefined ? (`pageNumber=${pageNumber}`) : '';
      const response = await api.get(
        `/userRole?${getCount}`
        + `${getPageNumber}`,
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  updateUserRole = async (id: string, userRole: any) => {
    try {
      const response = await api.put(`/userRole/${id}`, userRole);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  deleteUserRole = async (id: string) => {
    try {
      const response = await api.delete(`/userRole/${id}`);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }



  getSearchResult = async (searchText: string, pageNumber?: number, count?: number) => {
    const searchCount = count !== undefined ? (`count=${count}&`) : '';
    const searchPageNumber = pageNumber !== undefined ? (`pageNumber=${pageNumber}`) : '';
    try {
      const response = await api.get(
        `/userRole/search?query=${encodeURIComponent(searchText)}&`
        + `${searchCount}`
        + `${searchPageNumber}`,
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new UserRoleService();
