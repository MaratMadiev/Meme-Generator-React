import axios from 'axios';

// Типы
export interface GiphyGif {
  id: string;
  title: string;
  images: {
    fixed_width: {
      url: string;
      mp4: string;
      width: string;
      height: string;
    },
    original: {
      url: string;
      mp4: string;
      width: string;
      height: string;
    }
  };
}

export interface GiphyResponse {
  data: GiphyGif[];
}

const API_KEY = 'yIkxhSkLVAmxgbltNEg5MDulVoSp8OpU';
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export const giphyApi = {
  // Поиск 
  async search(query: string, limit: number = 20): Promise<GiphyGif[]> {
    try {
      const response = await axios.get<GiphyResponse>(`${BASE_URL}/search`, {
        params: {
          api_key: API_KEY,
          q: query,
          limit,
          rating: 'g'
        }
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Ошибка при поиске гифок:', error);
      throw error;
    }
  },

async getGifAsArrayBuffer(url: string): Promise<ArrayBuffer> {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer'
      });
      
      return response.data; 
    } catch (error) {
      console.error('Ошибка при загрузке гифки:', error);
      throw error;
    }
  },


  // Популярные гифки
  async trending(limit: number = 20): Promise<GiphyGif[]> {
    try {
      const response = await axios.get<GiphyResponse>(`${BASE_URL}/trending`, {
        params: {
          api_key: API_KEY,
          limit,
          rating: 'g'
        }
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Ошибка при загрузке популярных гифок:', error);
      throw error;
    }
  }
};