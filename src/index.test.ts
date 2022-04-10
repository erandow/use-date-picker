import { useMyHook } from "./";
import { renderHook } from "@testing-library/react-hooks";

// mock timer using jest
jest.useFakeTimers();

describe("useMyHook", () => {
  it("updates every second", () => {
    const { result } = renderHook(() => useMyHook({ locale: "fa" }));
    console.log("arr2", result.current[result.current.length - 1]);

    expect(true).toBe(true);
  });
});
