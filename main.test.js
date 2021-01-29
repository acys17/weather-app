import { getTime } from "./main.js";

describe("Testing get time function", () => {
    it("Should check the time is valid", () => {
        expect(getTime()).toBeDefined();
        expect(getTime(2)).toBeTruthy();
        expect(getTime("")).toBeFalsy();
        expect(getTime("2")).toBeFalsy();
        expect(getTime(null)).toBeFalsy();
        expect(getTime(undefined)).toBeFalsy();
    });
})