import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Input } from "../components/Input";
import { useGiphySearch } from "../hooks/useGifSearch";
import useDebounce from "../hooks/useDebounce";
import { Skeleton } from "../components/Skeleton";
import { ITEMS_PER_PAGE } from "../constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs";
import GiphyList from "./GiphyList";

const GiphySearch = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState("gifs");
    const { gifs, loading, error, searchGifs, fetchTrendingGifs } = useGiphySearch();

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
            searchGifs(debounceQuery, page, selectedTab);
        } else {
            fetchTrendingGifs(page, selectedTab);
        }
    }, [debounceQuery, page, selectedTab]);

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
        setPage(Math.max(1, newPage));
    };

    return (
        <div className="max-w-6xl mx-auto p-4 flex flex-col justify-center items-center">
            <Input
                type="text"
                value={query}
                onChange={handleQueryChange}
                placeholder="Search for GIFs"
                className="max-w-lg h-16  rounded-xl"
            />
            <Tabs
                defaultValue="gifs"
                className="w-full text-center mt-6"
            >
                <TabsList>
                    <TabsTrigger
                        value="gifs"
                        onClick={() => setSelectedTab("gifs")}
                    >
                        GIFs
                    </TabsTrigger>
                    <TabsTrigger
                        value="stickers"
                        onClick={() => setSelectedTab("stickers")}
                    >
                        Stickers
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="gifs">
                    <GiphyList
                        gifs={gifs}
                        debounceQuery={debounceQuery}
                        error={error}
                        loading={loading}
                        handlePageChange={handlePageChange}
                        page={page}
                    />
                </TabsContent>
                <TabsContent value="stickers">
                    <GiphyList
                        gifs={gifs}
                        debounceQuery={debounceQuery}
                        error={error}
                        loading={loading}
                        handlePageChange={handlePageChange}
                        page={page}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default GiphySearch;
