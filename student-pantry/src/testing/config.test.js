import "./toContainObject";
import {addFood, removeProduct, getFood, updateWasted, getWasted, getShared, updateShared, updateIsLow, updateExpired} from "../store/config.js";
import {clearFood, makeTestPantry, clearWasteHistory} from './helpers.js'

/*Test Pantry has [
    {id: Cheese, isLow: true, shared: true, useBy: 2023 04 15, purchaseDate: 2023 07 03},
    {id: Ham, isLow: false, shared: false, useBy: 2023 03 23, purchaseDate: 2023 07 03},
    {id: Onion, isLow: true, shared: false, useBy: 2023 09 15, purchaseDate: 2023 07 03},
    {id: Soup, isLow: false, shared: true, useBy: 2025 05 04, purchaseDate: 2023 07 03},
*/
describe("testing getters for food collection", () =>{
    beforeAll(() => {
        return makeTestPantry("test123");
    })
    afterAll(() => {
        return clearFood("test123");
    })

    test("getShared returns expected length", async () => {
        const data = await getShared("test123");
        expect(data).toHaveLength(2);
    })

    test("getShared returns an array", async () => {
        const data = await getShared("test123");
        expect(data).toBeInstanceOf(Array);
    })
    
    test("getShared returns correct objects", async () => {
        const data = await getShared("test123");
        expect(data).toContainObject({id: "Cheese", id: "Soup"})
    })

    test("getShared handles nonexistent user properly", async () => {
        const data = await getShared("bfhbfjhs");
        expect(data).toHaveLength(0);
    })

    test("getShared handles unexpected input type properly", async () => {
        const data = await getShared(23456);
        expect(data).toHaveLength(0);
    })
    
    test("getFood returns expected length", async () => {
        const data = await getFood("test123");
        expect(data).toHaveLength(4);
    })
    
    test("getFood returns an array", async () => {
        const data = await getFood("test123")
        expect(data).toBeInstanceOf(Array);
    })
    
    test("getFood returns correct objects", async () => {
        const data = await getFood("test123");
        expect(data).toContainObject({id: "Cheese", id:"Ham", id:"Onion", id:"Soup"})
    })

    test("getFood handles nonexistent user properly", async () => {
        const data = await getFood("yvdvdyu");
        expect(data).toHaveLength(0);
    })

    test("getFood handles unexpected input type properly", async () => {
        const data = await getFood(12345);
        expect(data).toHaveLength(0);
    })
})

describe("Testing waste history collection", () => {
    beforeAll(() => {
        return makeTestPantry("test123"), updateWasted("test123", "Cheese"), updateWasted("test123", "Soup");
    })
    afterAll(() => {
        return clearFood("test123"), clearWasteHistory("test123");
    })

    test("getWasted returns expected length", async() => {
        const data = await getWasted("test123");
        expect(data).toHaveLength(2);
    
    })
    
    test("getWasted returns an array", async () => {
        const data = await getWasted("test123");
        expect(data).toBeInstanceOf(Array);
    })
    
    test("getWasted returns correct objects", async () => {
        const data = await getWasted("test123");
        expect(data).toContainObject({id: "Soup", id: "Cheese"});
    })

    test("getWasted handles nonexistent user as expected", async () => {
        const data = await getWasted("edtrfygji");
        expect(data).toHaveLength(0);
    })

    test("getWasted handles unexpected input type as expected", async () => {
        const data = await getWasted(323);
        expect(data).toHaveLength(0);
    })
})
describe("Testing setter functions", () => {
    beforeEach(() => {
        return makeTestPantry("test123")
    })

    afterEach(() => {
        return clearFood("test123"), clearWasteHistory("test123")
    })

    test("addFood adds correctly", async () => {
        const bool = await addFood("test123", "Bacon", false, new Date("2023 04 15"), false, new Date("2023 03 07"));
        const data = await getFood("test123")
        expect(data).toHaveLength(5);
        expect(bool).toBeTruthy();
    })

    test("addFood handles nonexisting user as expected", async () => {
        const bool = await addFood("notExist", "Bacon", false, new Date("2023 04 15"), false, new Date("2023 03 07"));
        expect(bool).toBeFalsy();
    })

    test("addFood handles invalid food correctly", async () => {
        const bool = await addFood("test123", "5367rh4cn 90-3098u rhw", false, new Date("2023 04 15"), false, new Date("2023 03 07"));
        const data = await getFood("test123");
        expect(bool).toBeFalsy();
        expect(data).toHaveLength(4);
    })

    test("addFood handles invalid low boolean correctly", async () => {
        const bool = await addFood("test123", "Bacon", 672382, new Date("2023 04 15"), false, new Date("2023 03 07"));
        const data = await getFood("test123");
        expect(bool).toBeFalsy();
        expect(data).toHaveLength(4);
    })

    test("addFood handles invalid useby type input correctly", async () => {
        const bool = await addFood("test123", "Bacon", false, "2023 04 15", false, new Date("2023 03 07"));
        const data = await getFood("test123");
        expect(bool).toBeFalsy();
        expect(data).toHaveLength(4);
    })

    test("addFood handles invalid shared boolean correctly", async () => {
        const bool = await addFood("test123", "Bacon", false, new Date("2023 04 15"), "nsdhdb", new Date("2023 03 07"));
        const data = await getFood("test123");
        expect(bool).toBeFalsy();
        expect(data).toHaveLength(4);
    })

    test("addFood handles invalid purchase date input type correctly", async () => {
        const bool = await addFood("test123", "Bacon", false, new Date("2023 04 15"), false, "2023 03 07");
        const data = await getFood("test123");
        expect(bool).toBeFalsy();
        expect(data).toHaveLength(4);
    })
    
    test("removeProduct removes correctly", async() => {
        var data = await getFood("test123");
        expect(data).toContainObject({id: "Ham"});

        const bool = await removeProduct("test123", "Ham");
        var data = await getFood("test123");
        expect(data).not.toContainObject({id: "Ham"});
        expect(bool).toBeTruthy();
    })

    test("removeProduct handles invalid food properly", async () => {
        const bool = await removeProduct("test123", "786t7rtfy3gv4bh3u5");
        expect(bool).toBeFalsy;
    })
    
    test("removeProduct handles nonexistent user as expected", async () => {
        const bool = await removeProduct("notExist", "Ham");
        expect(bool).toBeFalsy();
    })

    test("removeProduct handles nonexistent food as expected", async () => {
        const bool = await removeProduct("test123", "Pizza");
        expect(bool).toBeFalsy();
    })

    test("removeProduct handles incorrect product type correctly", async () => {
        const bool = await removeProduct("test123", 4468);
        expect(bool).toBeFalsy();
    })
    
    test("updateWasted updates correctly", async() => {    
        const bool = await updateWasted("test123", "Cheese");
        const wasteData = await getWasted("test123")
        const data = await getFood("test123")
        expect(bool).toBeTruthy();
        expect(wasteData).toHaveLength(1);
        expect(data).toHaveLength(3);
    })

    test("updateWasted handles nonexistent user correctly", async () => {
        const bool = await updateWasted("notExist", "Ham");
        expect(bool).toBeFalsy;
    })

    test("updateWasted handles nonexistent product correctly", async () => {
        const bool = await updateWasted("test123", "Pizza");
        expect(bool).toBeFalsy();
    })

    test("updateWasted handles incorrect product type as expected", async () => {
        const bool = await updateWasted("test123", 783);
        expect(bool).toBeFalsy();
    })
    
    test("updateShared updates correctly", async () => {
        var data = await getShared("test123");
        expect(data).not.toContainObject({id: "Ham"});
    
        const bool = await updateShared("test123", "Ham", true);
        var data = await getShared("test123");
        expect(data).toContainObject({id: "Ham"});
        expect(bool).toBeTruthy();
    })

    test("updateShared handles nonexistent user correctly", async () => {
        const bool = await updateShared("notExist", "Ham", true);
        expect(bool).toBeFalsy;
    })

    test("updateShared handles nonexistent product correctly", async () => {
        const bool = await updateShared("test123", "Pizza", true);
        expect(bool).toBeFalsy();
    })

    test("updateShared handles incorrect product type as expected", async () => {
        const bool = await updateShared("test123", 783, true);
        expect(bool).toBeFalsy();
    })

    test("updateShated handles incorrect boolea type as expected", async () => {
        const bool = await updateShared("test123", "Ham", "wrong");
        expect(bool).toBeFalsy();
    })
    
    test("updateIsLow updates correctly", async() => {
        await clearFood("test123")
        await addFood("test123", "Cheese", true, new Date("2023 04 15"), false, new Date("2023 03 07"));
    
        var data = await getFood("test123");
        expect(data[0].isLow).toBeTruthy();
    
        const bool = await updateIsLow("test123", "Cheese", false);
        data = await getFood("test123")
        expect(data[0].isLow).toBeFalsy();
        expect(bool).toBeTruthy();
    })
    
    test("updateIsLow handles nonexistent user correctly", async () => {
        const bool = await updateIsLow("notExist", "Ham", true);
        expect(bool).toBeFalsy;
    })

    test("updateIsLow handles nonexistent product correctly", async () => {
        const bool = await updateIsLow("test123", "Pizza", true);
        expect(bool).toBeFalsy();
    })

    test("updateIsLow handles incorrect product type as expected", async () => {
        const bool = await updateIsLow("test123", 783, true);
        expect(bool).toBeFalsy();
    })

    test("updateIsLow handles incorrect bool as expected", async () => {
        const bool = await updateIsLow("test123", "Ham", "wrong");
        expect(bool).toBeFalsy();
    })

    test("updateExpired functions correctly", async() => {
        await addFood("test123", "Pizza", true, new Date("2022 04 15"), true, new Date("2021 03 07"));
        var wasteData = await getWasted("test123");
        expect(wasteData).toHaveLength(0);

        await updateExpired("test123");

        wasteData = await getWasted("test123");
        var data = await getFood("test123");
        expect(data).not.toContainObject({id: "Pizza"});
        expect(wasteData).toContainObject({id: "Pizza"});
    })
})