import React, { Fragment } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./../library/Pagination";
import { Pagination as PaginationType } from "../../dummyData/data";
import { ITEMS_PER_PAGE } from "../../constants";
interface PaginationComponentProps {
    currentPage: number;
    handlePageChange: (_value: number) => void;
    pagination: PaginationType;
}
function PaginationComponent({
    currentPage,
    handlePageChange,
    pagination,
}: PaginationComponentProps) {
    const getPageNumbers = () => {
        const pages = [];
        const totalCount = pagination.total_count || 0;
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        if (totalPages <= 7) {
            // If total pages is 7 or less, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                // Show ellipsis after first page
                pages.push("ellipsis1");
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                // Show ellipsis before last page
                pages.push("ellipsis2");
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                </PaginationItem>
                {getPageNumbers().map((page) => (
                    <Fragment key={`page-${page}`}>
                        {page === "ellipsis1" || page === "ellipsis2" ? (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem>
                                <PaginationLink
                                    isActive={page === currentPage}
                                    onClick={() => handlePageChange(page as unknown as number)}
                                    className="cursor-pointer"
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                    </Fragment>
                ))}

                <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default PaginationComponent;
