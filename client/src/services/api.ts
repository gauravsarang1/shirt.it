import axios from 'axios';

export interface ShortenResponse {
  id: number;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const urlService = {
  shorten: async (url: string): Promise<ShortenResponse> => {
    const response = await api.post<ShortenResponse>('/shorten', { url });
    return response.data;
  }
};
