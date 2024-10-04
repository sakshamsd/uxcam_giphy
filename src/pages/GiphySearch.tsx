import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "../components/Input";
import { useGiphySearch } from "../hooks/useGifSearch";
import useDebounce from "../hooks/useDebounce";
import GiphyList from "./GiphyList";
import { Button } from "../components/Button";
import img2 from "../assets/images/gifhub2.png";
import { GIPHY_TABS } from "../constants";
import Trending from "../assets/icons/Trending";

const GiphySearch = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState("gifs");
    const { gifs, loading, error, searchGifs, fetchTrendingGifs } = useGiphySearch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchTerm = params.get("q") || "";
        const pageNum = parseInt(params.get("page") || "1");

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

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuery(e.target.value);
        setPage(1); // Reset to the first page on a new search
    };

    const handlePageChange = (newPage: number) => {
        setPage(Math.max(1, newPage));
    };

    return (
        <div className="max-w-5xl mx-auto flex flex-col justify-center items-center px-8">
            <header className="w-full flex justify-center ">
                <img
                    src={img2}
                    height={100}
                    className="h-24"
                />
            </header>
            <Input
                type="text"
                value={query}
                onChange={handleQueryChange}
                placeholder="Search for GIFs and Stickers here..."
                className=" w-full h-14 rounded-xl"
            />
            <div className="flex justify-between flex-row  w-full mt-8">
                <span className="text-2xl">
                    {gifs &&
                        (debounceQuery ? (
                            `Search Results: ${debounceQuery}`
                        ) : (
                            <span className="flex flex-row gap-2">
                                <Trending />
                                <span>Trending</span>
                            </span>
                        ))}
                </span>
                <span className="flex gap-4 ">
                    {GIPHY_TABS.map((button) => (
                        <Button
                            key={button.key}
                            className="rounded-3xl "
                            variant={selectedTab === button.key ? "default" : "secondary"}
                            onClick={() => setSelectedTab(button.key)}
                        >
                            {button.label}
                        </Button>
                    ))}
                </span>
            </div>

            <GiphyList
                gifs={gifs}
                error={error}
                loading={loading}
                handlePageChange={handlePageChange}
                page={page}
            />
        </div>
    );
};

export default GiphySearch;
