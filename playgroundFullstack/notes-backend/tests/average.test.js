const average = require("../utils/for_testing").average

describe("average", () => {

    test("of one value is the value itself", () => {
        expect(average([1])).toBe(1)
    })

    test("of a sequential set from 1 to 6 to be 3.5", () => {
        expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
    })

    test("of an empty array is zero", () => {
        expect(average([])).toBe(0)
    })


})