import { renderHook } from "@testing-library/react";
import { usePagination } from "../usePagination";

describe("usePagination", () => {
  it("should return an array of page numbers when there are fewer pages than totalPageNumbers", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 10,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 1,
      })
    );

    const pageNumbers = result.current;

    expect(pageNumbers).toEqual([1]);
  });

  it("should show ellipses on the right side when there are more pages on the right", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 100,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 1,
      })
    );

    const pageNumbers = result.current;

    expect(pageNumbers).toEqual([1, 2, 3, 4, 5, "...", 10]);
  });

  it("should show ellipses on the left side when there are more pages on the left", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 100,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 10,
      })
    );

    const pageNumbers = result.current;

    expect(pageNumbers).toEqual([1, "...", 6, 7, 8, 9, 10]);
  });

  it("should show ellipses on both sides when there are more pages on both sides", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 100,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 5,
      })
    );

    const pageNumbers = result.current;

    expect(pageNumbers).toEqual([1, "...", 4, 5, 6, "...", 10]);
  });

  it("should return an array of page numbers when totalPageNumbers equals totalPageCount", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 5,
        pageSize: 5,
        siblingCount: 1,
        currentPage: 1,
      })
    );

    const pageNumbers = result.current;

    expect(pageNumbers).toEqual([1]);
  });
});
