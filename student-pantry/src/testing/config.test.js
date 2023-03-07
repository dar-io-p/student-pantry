import "./toContainObject";
import {addFood, clearFood, makeTestPantry, getIndividual, removeProduct, getNotWasted, updateWasted, getWasted, getShared, updateShared, updateIsLow, updateExpired} from "../store/config.js";


/*Test Pantry has [
    {id: Cheese, isLow: true, shared: true, useBy: 2023 04 15, purchaseDate: 2023 07 03, isWasted: false},
    {id: Ham, isLow: false, shared: false, useBy: 2023 03 23, purchaseDate: 2023 07 03, isWasted: false},
    {id: Onion, isLow: true, shared: false, useBy: 2023 09 15, purchaseDate: 2023 07 03, isWasted: false},
    {id: Soup, isLow: false, shared: true, useBy: 2025 05 04, purchaseDate: 2023 07 03, isWasted: false},
*/

beforeEach(() => {
    return makeTestPantry();
  });
  
  afterEach(() => {
    return clearFood("test123");
  });

test("getIndividual returns expected length", async () => {
    const data = await getIndividual("test123");
    expect(data).toHaveLength(2);
});

test("getIndividual returns an array", async () => {
    const data = await getIndividual("test123");
    expect(data).toBeInstanceOf(Array);
});

test("getIndividual returns correct objects", async () => {
    const data = await getIndividual("test123");
    expect(data).toContainObject({id: "Ham", id: "Onion"});
})

test("removeProduct removes correctly", async() => {
    var data = await getIndividual("test123");
    expect(data).toContainObject({id: "Ham"});

    await removeProduct("test123", "Ham");
    var data = await getIndividual("test123");
    expect(data).not.toContainObject({id: "Ham"});
})

test("updateWasted updates correctly", async() => {
    await clearFood("test123")
    await addFood("test123", "Cheese", true, "2023 04 15", false, "2023 03 07")

    var data = await getIndividual("test123");
    expect(data[0].isWasted).toBeFalsy();

    await updateWasted("test123", "Cheese", true);
    data = await getWasted("test123")
    expect(data[0].isWasted).toBeTruthy();
})

test("updateShared updates correctly", async () => {
    var data = await getShared("test123");
    expect(data).not.toContainObject({id: "Ham"});

    await updateShared("test123", "Ham", true);
    var data = await getShared("test123");
    expect(data).toContainObject({id: "Ham"});
})

test("updateIsLow updates correctly", async() => {
    await clearFood("test123")
    await addFood("test123", "Cheese", true, "2023 04 15", false, "2023 03 07")

    var data = await getIndividual("test123");

    expect(data[0].isLow).toBeTruthy();
    
    await updateIsLow("test123", "Cheese", false);
    data = await getIndividual("test123")
    expect(data[0].isLow).toBeFalsy();
})

test("updateExpired functions correctly", async() => {
    await clearFood("test123")
    await addFood("test123", "Cheese", true, "2022 04 15", false, "2023 03 07")

    await updateExpired("test123");
    data = await getWasted("test123");
    expect(data).toContainObject({id: "Cheese"});
})
