import "./toContainObject";
import { generateNumber , isInGroup, leaveGroup, joinGroup, getUsers, createGroup, makeTestPantryG1, makeTestPantryG2, getSharedPantry, clearFood} from "../store/config";

beforeAll(() => {
    return createGroup("123456", "placeholder");
})

beforeEach(() =>{
    return leaveGroup("123456", "test123"), leaveGroup("123456", "test456")
})


test("generateNumber returns correct length", async () => {
    const id = await generateNumber();
    expect(id).toHaveLength(6);
})

test("generateNumber returns Numeric string", async () => {
    const id = await generateNumber();
    expect(Number(id)).not.toBeNaN();
})

test("generateNumber returns a string", async () => {
    const id = await generateNumber();
    expect(typeof(id)).toBe('string');
})

test("isInGroup functions correctly", async () => {
    await joinGroup("123456", "test123");
    const bool1 = await isInGroup("test123");
    const bool2 = await isInGroup("test456")
    expect(bool1).toBeTruthy();
    expect(bool2).toBeFalsy();
})

test("joinGroup functions correctly", async () => {
    const bool1 = await joinGroup("123456", "test123");
    const bool2 = await joinGroup("567234", "test456");
    expect(bool1).toBeTruthy();
    expect(bool2).toBeFalsy();
})

test("leaveGroup returns false if invalid ID", async () => {
    await joinGroup("123456", "test123");
    const bool1 = await leaveGroup("123456", "test123");
    const bool2 = await leaveGroup("645123", "test456");
    expect(bool1).toBeTruthy;
    expect(bool2).toBeFalsy;
})

test("leaveGroup deletes group if empty", async () => {
    await createGroup("102030", "test123");
    await leaveGroup("102030", "test123");
    const bool1 = await joinGroup("102030", "test123");
    expect(bool1).toBeFalsy();
})

test("createGroup functions correctly", async () => {
    const data1 = await getUsers("696969");
    expect(data1).toHaveLength(0);

    await createGroup("696969", "test123");

    const data2 = await getUsers("696969");
    expect(data2).toHaveLength(1);

    await leaveGroup("696969", "test123");
})

test("getUsers returns an array", async () => {
    await joinGroup("123456", "test123");
    await joinGroup("123456", "test456");

    const data = await getUsers("123456");
    expect(data).toBeInstanceOf(Array);
})

test("getUsers returns expected length", async () => {
    await joinGroup("123456", "test123");
    await joinGroup("123456", "test456");

    const data = await getUsers("123456");
    expect(data).toHaveLength(3);
})

test("getUsers returns expected strings", async () => {
    await joinGroup("123456", "test123");
    await joinGroup("123456", "test456");

    const data = await getUsers("123456");
    expect(data).toContain("test123", "test456", "placeholder");
})

describe("testing getSharedPantry", () => {
    beforeAll(() => {
        return makeTestPantryG1(), makeTestPantryG2(), joinGroup("456789", "testG1"), joinGroup("456789", "testG2")
    })

    test("getSharedPantry returns an array", async () => {
        const data = await getSharedPantry("456789");
        expect(data).toBeInstanceOf(Array);
    })

    test("getSharedPantry returns expected length", async () => {
        const data = await getSharedPantry("456789");
        expect(data).toHaveLength(5);
    })

    test("getSharedPantry returns correct objects", async () => {
        const data = await getSharedPantry("456789");
        expect(data).toContainObject({id: "Cheese", id: "Soup", id: "Pizza", id:"Kimchi", id:"Pork"});
    });
});
