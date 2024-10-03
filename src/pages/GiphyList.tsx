import { Skeleton } from "../components/Skeleton";
import { APIResponse, Datum } from "../dummyData/data";
import PaginationComponent from "../components/PaginationComponent";

interface GiphyListProps {
    gifs: APIResponse | null;
    debounceQuery: string;
    error: string | null;
    loading: boolean;
    handlePageChange: (_value: number) => void;
    page: number;
}

function GiphyList({
    gifs,
    debounceQuery,
    error,
    loading,
    handlePageChange,
    page,
}: GiphyListProps) {
    return (
        <>
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
        </>
    );
}

export default GiphyList;
