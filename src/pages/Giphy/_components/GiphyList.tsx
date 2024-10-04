import { APIResponse, Datum } from "../../../dummyData/data";
import PaginationComponent from "../../../components/ui/PaginationComponent";
import { ITEMS_PER_PAGE } from "../../../constants";
import { Skeleton } from "../../../components/library/Skeleton";

interface GiphyListProps {
    gifs: APIResponse | null;
    error: string | null;
    loading: boolean;
    handlePageChange: (_value: number) => void;
    page: number;
}

function GiphyList({ gifs, error, loading, handlePageChange, page }: GiphyListProps) {
    return (
        <>
            <div className="flex w-full mt-6 gap-1 flex-wrap justify-between mb-6 min-h-[500px]">
                {error && <div className="text-red-500 mb-4 mt-6 text-center w-full">{error}</div>}
                {loading
                    ? Array.from(Array(ITEMS_PER_PAGE)).map((_, i) => {
                          return (
                              <Skeleton
                                  key={i}
                                  className="w-[14.75rem] h-[14.75rem] rounded"
                              />
                          );
                      })
                    : gifs?.data.map((gif: Datum) => (
                          <img
                              key={gif.id}
                              src={gif.images.preview_gif.url}
                              alt={gif.title}
                              className=" w-[14.75rem] h-[14.75rem] object-cover rounded"
                          />
                      ))}
            </div>

            {gifs && (
                <PaginationComponent
                    currentPage={page}
                    handlePageChange={handlePageChange}
                    pagination={gifs.pagination}
                />
            )}
        </>
    );
}

export default GiphyList;
