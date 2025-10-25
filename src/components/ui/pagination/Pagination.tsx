"use client";

import React from "react";
import clsx from "clsx";
import { LuChevronLeft, LuChevronRight, LuEllipsis } from "react-icons/lu";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getVisiblePages = () => {
    const delta = 2;
    const pages: (number | string)[] = [];
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (rangeStart > 2) pages.push("...");

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getVisiblePages();

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={clsx("flex justify-center items-center mt-10", className)}
    >
      <ul className="flex items-center gap-2">
        {/* Previous */}
        <li>
          <button
            aria-label="Previous page"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={clsx(
              "flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium transition",
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] border-[theme(--border)] text-[theme(--muted-foreground)] bg-[theme(--muted)] shadow-sm cursor-pointer"
              //   "border-[theme(--border)] text-[theme(--muted-foreground)] bg-[theme(--muted)] shadow-sm",
              //   "hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)]",
              //   currentPage === 1 && "opacity-50 cursor-not-allowed"
            )}
          >
            <LuChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
        </li>

        {/* Page Numbers */}
        {pages.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="flex h-9 w-9 items-center justify-center text-[theme(--muted-foreground)]">
                <LuEllipsis className="h-4 w-4" />
              </span>
            ) : (
              <button
                onClick={() => goToPage(Number(page))}
                aria-current={page === currentPage ? "page" : undefined}
                className={clsx(
                  "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition-colors cursor-pointer",
                  page === currentPage
                    ? "bg-[theme(--primary)] text-[theme(--primary-foreground)] border-[theme(--primary)]"
                    : "border-[theme(--border)] text-[theme(--foreground)] bg-[theme(--card)] shadow-sm hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)]"
                )}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            aria-label="Next page"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={clsx(
              "flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium transition",
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] border-[theme(--border)] text-[theme(--muted-foreground)] bg-[theme(--muted)] shadow-sm cursor-pointer"
            )}
          >
            <span>Next</span>
            <LuChevronRight className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
