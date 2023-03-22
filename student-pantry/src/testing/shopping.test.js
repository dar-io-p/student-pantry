import { addFoodShoppingList, getShoppingList, removeFoodShoppingList } from "../store/shoppingConfig";
import { clearShoppingList, makeTestShoppingList } from "./helpers";

describe("testing getShoppping", () => {
    beforeAll(() => {
        return makeTestShoppingList("test123");
    })
    afterAll(() => {
        return clearShoppingList("test123")
    })
    test("getShoppingList returns an array", async () => {
        const data = await getShoppingList("test123");
        expect(data).toBeInstanceOf(Array);
    })
    test("getShoppingList returns expected length", async () => {
        const data = await getShoppingList("test123");
        expect(data).toHaveLength(2);
    })
    test("getShoppingList returns expected items", async () => {
        const data = await getShoppingList("test123");
        expect(data).toContain("Garlic", "Ginger");
    })
    test("getShopppingList handles nonexistent user as expected", async () => {
        const data = await getShoppingList("notExist");
        expect(data).toHaveLength(0);
    })
    test("getShoppingList handles incorrect user type as expected", async () => {
        const data = await getShoppingList(123);
        expect(data).toHaveLength(0);
    })
})

describe("testing addFoodShoppingList", () => {
    afterAll(() => {
        return clearShoppingList("test123");
    })
    test("addFoodShoppingList functions correctly", async () => {
        const bool = await addFoodShoppingList("test123", "Garlic");
        const data = await getShoppingList("test123");
        expect(bool).toBeTruthy();
        expect(data).toHaveLength(1);
    })
    test("addFoodShoppingList handles nonexistent user as expected", async () => {
        const bool = await addFoodShoppingList("notExist", "Garlic");
        expect(bool).toBeFalsy();
    })
    test("addFoodShoppingList handles invalid food as expected", async () => {
        const bool = await addFoodShoppingList("test123", "nfrehg373");
        expect(bool).toBeFalsy();
    })
    test("addFoodShoppingList handles incorrect user type as expected", async () => {
        const bool = await addFoodShoppingList(123, "Garlic");
        expect(bool).toBeFalsy();
    })
    test("addFoodShoppingList handles incorrect food types as expected", async () => {
        const bool = await addFoodShoppingList("test123", 345);
        expect(bool).toBeFalsy();
    })
})

describe("testing removeFoodShoppingList", () => {
    beforeAll(() => {
        return makeTestShoppingList("test123");
    })
    afterAll(() => {
        return clearShoppingList("test123");
    })

    test("removeFoodShoppingList functions as expected", async () => {
        const bool = await removeFoodShoppingList("test123", "Garlic");
        const data = await getShoppingList("test123");
        expect(bool).toBeTruthy();
        expect(data).toHaveLength(1);
    })
    test("removeFoodShoppingList handles nonexistent user as expected", async () => {
        const bool = await removeFoodShoppingList("notExist", "Garlic");
        expect(bool).toBeFalsy();
    })
    test("removeFoodShoppingList handles invalid food as expected", async () => {
        const bool = await removeFoodShoppingList("test123", "nfrehg373");
        expect(bool).toBeFalsy();
    })
    test("removeFoodShoppingList handles incorrect user type as expected", async () => {
        const bool = await removeFoodShoppingList(123, "Garlic");
        expect(bool).toBeFalsy();
    })
    test("removeFoodShoppingList handles incorrect food types as expected", async () => {
        const bool = await removeFoodShoppingList("test123", 345);
        expect(bool).toBeFalsy();
    })

})
