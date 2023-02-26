import { isValidURL } from "./url";

describe("isValidURL", () => {
    it("should return true if there is a valid URL", () => {
        expect(isValidURL("https://google.com")).toBe(true);
        expect(isValidURL("http://google.com")).toBe(true);
        expect(isValidURL("https://www.google.com")).toBe(true);
    });

    it("should return false if there is an invalid URL", () => {
        expect(isValidURL("google.com")).toBe(false);
        expect(isValidURL("philipp@google.com")).toBe(false);
        expect(isValidURL("192.168.0.1")).toBe(false);
    });
});
