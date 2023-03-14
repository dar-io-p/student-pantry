import "./toContainObject";
import {addFood, clearFood, makeTestPantry, getIndividual, removeProduct, getNotWasted, updateWasted, getWasted, getShared, updateShared, updateIsLow, updateExpired, getWastedIndiv, getWastedShared} from "../store/config.js";


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
});

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

test("getWasted returns expected length", async() => {
    await clearFood("test123");
    await addFood("test123", "Cheese", true, "2022 04 15", true, "2023 03 07")
    await addFood("test123", "Ham", false, "2022 03 23", false, "2023 03 07")

    await updateExpired("test123");

    data = await getWasted("test123");
    expect(data).toHaveLength(2);

})

test("getWasted returns an array", async () => {
    await clearFood("test123");
    await addFood("test123", "Cheese", true, "2022 04 15", true, "2023 03 07")
    await addFood("test123", "Ham", false, "2022 03 23", false, "2023 03 07")

    await updateExpired("test123");

    const data = await getWasted("test123");
    expect(data).toBeInstanceOf(Array);
})

test("getWasted returns correct objects", async () => {
    await clearFood("test123");
    await addFood("test123", "Cheese", true, "2022 04 15", true, "2023 03 07")
    await addFood("test123", "Ham", false, "2022 03 23", false, "2023 03 07")

    await updateExpired("test123");

    const data = await getWasted("test123");
    expect(data).toContainObject({id: "Ham", id: "Cheese"});
})

test("getNotWasted returns expected length", async () => {
    const data = await getNotWasted("test123");
    expect(data).toHaveLength(4);
})

test("getNotWasted returns an array", async () => {
    const data = await getNotWasted("test123")
    expect(data).toBeInstanceOf(Array);
})

test("getNotWasted returns correct objects", async () => {
    const data = await getNotWasted("test123");
    expect(data).toContainObject({id: "Cheese", id:"Ham", id:"Onion", id:"Soup"})
})

test("getWastedIndiv returns expected length", async () => {
    await clearFood("test123");
    await addFood("test123", "Cheese", true, "2022 04 15", true, "2023 03 07")
    await addFood("test123", "Ham", false, "2022 03 23", false, "2023 03 07")

    await updateExpired("test123");

    const data = await getWastedIndiv("test123");
    expect(data).toHaveLength(1);
})

test("getWastedIndiv returns an array", async () => {
    await clearFood("test123");
    await addFood("test123", "Cheese", true, "2022 04 15", true, "2023 03 07")
    await addFood("test123", "Ham", false, "2022 03 23", false, "2023 03 07")

    await updateExpired("test123");

    const data = await getWastedIndiv("test123");
    expect(data).toBeInstanceOf(Array);
})

test("getWastedIndiv returns correct objects", async () => {
    await clearFood("test123");
    await addFood("test123", "Cheese", true, "2022 04 15", true, "2023 03 07")
    await addFood("test123", "Ham", false, "2022 03 23", false, "2023 03 07")

    await updateExpired("test123");

    const data = await getWastedIndiv("test123");
    expect(data).toContainObject({id: "Ham"});
})

test("getWastedShared returns expected length", async () => {
    await clearFood("test123");
    await addFood("test123", "Cheese", true, "2022 04 15", true, "2023 03 07")
    await addFood("test123", "Ham", false, "2022 03 23", false, "2023 03 07")

    await updateExpired("test123");

    const data = await getWastedShared("test123");
    expect(data).toHaveLength(1);
})

test("getWastedShared returns an array", async () => {
    await clearFood("test123");
    await addFood("test123", "Cheese", true, "2022 04 15", true, "2023 03 07")
    await addFood("test123", "Ham", false, "2022 03 23", false, "2023 03 07")

    await updateExpired("test123");

    const data = await getWastedShared("test123");
    expect(data).toBeInstanceOf(Array);
})

test("getWastedShared returns correct objects", async () => {
    await clearFood("test123");
    await addFood("test123", "Cheese", true, "2022 04 15", true, "2023 03 07")
    await addFood("test123", "Ham", false, "2022 03 23", false, "2023 03 07")

    await updateExpired("test123");

    const data = await getWastedShared("test123");
    expect(data).toContainObject({id: "Cheese"});
})

test("addFood adds correctly", async () => {
    await clearFood("test123");
    await addFood("test123", "Bacon", false, "2023 04 15", false, "2023 03 07");

    const data = await getIndividual("test123");
    expect(data).toHaveLength(1)
    expect(data[0].id).toBe("Bacon");
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
    await addFood("test123", "Cheese", true, "2022 04 15", true, "2023 03 07")

    await updateExpired("test123");
    data = await getWasted("test123");
    expect(data).toContainObject({id: "Cheese"});
})