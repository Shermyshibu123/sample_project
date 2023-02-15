import api from './api';

class TemplateService {
  getTemplateList = async (count?: number, pageNumber?: number, isUserTemplate?: any) => api.get(`/template?count=${count}&pageNumber=${pageNumber}&isUserTemplate=${isUserTemplate}`);

  getQuestionList = async (templateId?: any, count?: number, pageNumber?: number) => api.get(`/template/questions/${templateId}?count=${count}&pageNumber=${pageNumber}`);

  getTemplateListAll = async (isUserTemplate?: any) => api.get(`/template?isUserTemplate=${isUserTemplate}`);

  addTemplate = async (params: object) => api.post('/template', params);

  addQuestion = async (params: object, templateId: any) => api.post(`/template/questions/${templateId}`, params);

  updateTemplate = async (id: string, params: object) => api.put(`/template/${id}`, params);

  updateQuestion = async (name: string, params: object, templateId: any) => api.put(`/template/questions/${templateId}/${name}`, params);

  deleteTemplate = async (id: string) => api.delete(`/template/${id}`);

  deleteQuestion = async (name: string, templateId: string) => api.delete(`/template/questions/${templateId}/${name}`);

  searchTempalate = async (query: string, count: number, pageNumber: number, isUserTemplate: any) => api.get(`/template/search?query=${query}&count=${count}&pageNumber=${pageNumber}&isUserTemplate=${isUserTemplate}`);

  searchQuestion = async (query: string, count: number, pageNumber: number, templateId?: any) => api.get(`/template/questions/${templateId}?query=${query}&count=${count}&pageNumber=${pageNumber}`);
}

export default new TemplateService();
