import { useState, useCallback } from 'react';
import { giphyApi, type GiphyGif } from './GiphyAPI';

interface UseGiphyReturn {
  gifs: GiphyGif[];
  loading: boolean;
  error: string | null;
  searchGifs: (query: string) => Promise<void>;
  getTrending: () => Promise<void>;
}

export const useGiphy = (): UseGiphyReturn => {
  const [gifs, setGifs] = useState<GiphyGif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchGifs = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await giphyApi.search(query);
      setGifs(results);
    } catch (err) {
      setError('Не удалось загрузить гифки');
    } finally {
      setLoading(false);
    }
  }, []);

  const getTrending = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await giphyApi.trending();
      setGifs(results);
    } catch (err) {
      setError('Не удалось загрузить популярные гифки');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    gifs,
    loading,
    error,
    searchGifs,
    getTrending
  };
};