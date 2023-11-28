import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getData = async (endpoint) => {
  try {
    const response = await apiService.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDataById = async (endpoint) => { 
  try {
    const response = await apiService.get(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
}

export const getDataByItemId = async (endpoint) => {
  try {
    const response = await apiService.get(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
}

export const postData = async (endpoint, data) => {
  try {
    const response = await apiService.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putData = async (endpoint, data) => {
  try {
    const response = await apiService.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await apiService.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
