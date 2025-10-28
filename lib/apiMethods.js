import api from "./api";

export const getData = async (endpoint) => {
  const response = await api.get(endpoint);
  return response.data;
};

export const postData = async (endpoint, data) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

export const putData = async (endpoint, data) => {
  const response = await api.put(endpoint, data);
  return response.data;
};

export const deleteData = async (endpoint) => {
  const response = await api.delete(endpoint);
  return response.data;
};
