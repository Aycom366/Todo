import { act, renderHook } from "@testing-library/react";
import { useWindowDimension } from "..";

describe("useWindowDimension", () => {
  it("should return window dimensions when the window is resized", () => {
    const { result } = renderHook(() => useWindowDimension());

    act(() => {
      window.innerWidth = 800;
      window.innerHeight = 600;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });
});
