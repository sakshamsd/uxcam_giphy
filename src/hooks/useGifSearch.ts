import { useState } from "react";
import { APIResponse } from "../dummyData/data";
import { envConfig, ITEMS_PER_PAGE } from "../constants";
import { useNavigate } from "react-router-dom";

interface UseGiphySearchReturn {
    gifs: APIResponse | null;
    loading: boolean;
    error: string | null;
    searchGifs: (query: string, page: number, tab: string) => void;
    fetchTrendingGifs: (page: number, tab: string) => void;
}

export const useGiphySearch = (): UseGiphySearchReturn => {
    const [gifs, setGifs] = useState<APIResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchGiphy = async (endpoint: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(endpoint);
            const data: APIResponse = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setGifs(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const searchGifs = async (query: string, page: number, tab: string) => {
        const url = `${envConfig.apiEndpoint}/${tab}/search?api_key=${envConfig.apiKey}&q=${query}&limit=${ITEMS_PER_PAGE}&offset=${page * ITEMS_PER_PAGE}`;
        await fetchGiphy(url);
        navigate(`?q=${encodeURIComponent(query)}&page=${page}`, { replace: true });
    };

    const fetchTrendingGifs = async (page: number, tab: string) => {
        const url = `${envConfig.apiEndpoint}/${tab}/trending?api_key=${envConfig.apiKey}&limit=${ITEMS_PER_PAGE}&offset=${(page - 1) * ITEMS_PER_PAGE}`;
        await fetchGiphy(url);
        navigate("", { replace: true });
    };

    return { gifs, loading, error, searchGifs, fetchTrendingGifs };
};
