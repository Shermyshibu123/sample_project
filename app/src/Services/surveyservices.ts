import authStore from '../Store/authStore';
import api from './api';
class SurveyService {

  getSurveyTemplate = async (surveyKey: string) => api.get(`/survey/surveyTemplate?surveyKey=${surveyKey}`);

  getSurveyList = async (count: number, pageNumber: number) => api.get(`/survey?count=${count}&pageNumber=${pageNumber}`);

  getAllSurveyList = async () => api.get(`/survey`);

  addSurvey = async (params: object) => api.post('/survey', params);

  getReport = async (data: any) => api.get(`/report/surveyResponse?surveyId=${data}`);

  addSurveyResponse = async (params: object) => api.post('/survey/surveyResponse', params);

  editSurvey = async (id: string, params: object) => {
    try {
      const response = await api.put(`/survey/${id}`, params);
      if (response.data.createdUser !== authStore.currentUser?.email) {
        return Promise.reject("error");
      }
      else {
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  deleteSurvey = async (id: string) => {
    try {
      const response = await api.delete(`/survey/${id}`);
      if (response.data.createdUser !== authStore.currentUser?.email) {
        return Promise.reject("error");
      }
      else {
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getSurveyUrl = async () => api.get('/survey/defaultSurvey');

  searchSurvey = async (query: string, statusvalue: string, count: number, pageNumber: number) => api.get(`/survey?query=${query}&statusvalue=${statusvalue}&count=${count}&pageNumber=${pageNumber}`);

  getQrDetails = async (showroomId: string, modelId: string) => api.get(`/public/${showroomId}/${modelId}`);

  fetchProjects = async () => api.get('/survey/fetchProjects');

  editStatus = async (id: any, statusValue: any) => {
    try {
      const response = await api.put(`/survey/status/${id}`, statusValue);
      if (response.data.status.createdUser !== authStore.currentUser?.email) {
        return Promise.reject("error");
      }
      else {
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getPreviewTemplate = async (templateId: string) => api.get(`/survey/previewTemplate?templateId=${templateId}`);
}

export default new SurveyService();
