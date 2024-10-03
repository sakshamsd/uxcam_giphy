import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Datum } from "../dummyData/data";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../components/Pagination";
import { Input } from "../components/Input";
import { useGiphySearch } from "../hooks/useGifSearch";
import useDebounce from "../hooks/useDebounce";
import { Skeleton } from "../components/Skeleton";
import { ITEMS_PER_PAGE } from "../constants";
import PaginationComponent from "../components/PaginationComponent";

const GiphySearch = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const location = useLocation();
    const { gifs, loading, error, searchGifs, fetchTrendingGifs } = useGiphySearch();
    // const [pagesList, setPagesList] = useState<Array<number>>([]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchTerm = params.get("q") || "";
        const pageNum = parseInt(params.get("page") || "1", 10);

        setQuery(searchTerm);
        setPage(pageNum);
    }, [location.search]);

    const debounceQuery = useDebounce(query, 500);

    useEffect(() => {
        if (debounceQuery) {
            searchGifs(debounceQuery, page);
        } else {
            fetchTrendingGifs(page);
        }
    }, [debounceQuery, page]);

    useEffect(() => {
        const totalCount = gifs?.pagination.total_count || 0;
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    }, [gifs?.pagination, page]);

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuery(e.target.value);
        setPage(1); // Reset to the first page on a new search
    };

    const handlePageChange = (newPage: number) => {
        console.log(newPage);
        setPage(Math.max(1, newPage));
    };

    return (
        <div className="max-w-6xl mx-auto p-4 flex flex-col justify-center items-center">
            <Input
                type="text"
                value={query}
                onChange={handleQueryChange}
                placeholder="Search for GIFs"
                className="max-w-lg h-16 border-blue-300 rounded-xl"
            />

            <span className="mt-8 text-2xl">
                {gifs && (debounceQuery ? `Search Results: ${debounceQuery}` : "Trending")}
            </span>

            <div className="flex w-full mt-6  gap-4 flex-wrap justify-between mb-6 min-h-[500px]">
                {error && <div className="text-red-500 mb-4 mt-6 text-center w-full">{error}</div>}
                {loading
                    ? Array.from(Array(10)).map((_, i) => {
                          return (
                              <Skeleton
                                  key={i}
                                  className="w-48 h-48"
                              />
                          );
                      })
                    : gifs?.data.map((gif: Datum) => (
                          <img
                              key={gif.id}
                              src={gif.images.preview_gif.url}
                              alt={gif.title}
                              className="w-48 h-48 object-cover rounded"
                          />
                      ))}
            </div>

            {gifs && (
                <PaginationComponent
                    totalPages={50}
                    currentPage={page}
                    handlePageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default GiphySearch;
