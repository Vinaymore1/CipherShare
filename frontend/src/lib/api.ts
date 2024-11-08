import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/files';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const api = {
  uploadFiles: async (files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await axiosInstance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },

  shareText: async (text: string) => {
    try {
      const response = await axiosInstance.post('/share-text', 
        { text },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Text share error:', error);
      throw error;
    }
  },

  retrieveFile: async (code: string) => {
    try {
      const response = await axiosInstance.get(`/retrieve/${code}`);
      return response.data;
    } catch (error) {
      console.error('Retrieve file error:', error);
      throw error;
    }
  },

  retrieveText: async (code: string) => {
    try {
      const response = await axiosInstance.get(`/retrieve-text/${code}`);
      return response.data;
    } catch (error) {
      console.error('Retrieve text error:', error);
      throw error;
    }
  },

  downloadFile: async (code: string) => {
    try {
      const response = await axiosInstance.get(`/download/${code}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },
};
