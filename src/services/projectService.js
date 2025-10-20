import api from './api'

export const getAllProjects = async () => {
    const res = await api.get('/projects/all')
    return res.data.response
};

export const deleteProject = async (id) => {
    const res = await api.delete(`/projects/deleteParam/${id}`)
    return res.data
};

export const updateProject = async (id, data) => {
    const res = await api.put(`/projects/update/${id}`, data)
    return res.data.response
}

export const createProject = async (data) => {
    const res = await api.post('/projects/create', data);
    return res.data.response;
};

export const getProjectStats = async () => {
    const res = await api.get('/projects/graphics');
    return res.data.stats;
};

export const getSummary = async () => {
    const response = await api.get('/projects/summary');
    return response.data.resumen;
};