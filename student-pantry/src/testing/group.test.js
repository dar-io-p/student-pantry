import "./toContainObject";
import { generateNumber , isInGroup, leaveGroup, joinGroup, getUsers, createGroup, getSharedPantry} from "../store/config";
import {makeTestPantry, clearFood, makeTestPantryG2} from './helpers'

beforeAll(() => {
    return createGroup("123456", "placeholder");
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


describe("testing isInGroup", () => {
    beforeAll(() => {
        return (leaveGroup("123456", "test123"), leaveGroup("123456", "test456"))
    })
    afterEach(() =>{
        return (leaveGroup("123456", "test123"), leaveGroup("123456", "test456"))
    })
    test("isInGroup functions correctly", async () => {
        const bool1 = await joinGroup("123456", "test123");
        const bool2 = await isInGroup("test123");
        const bool3 = await isInGroup("test456")
        expect(bool1).toBeTruthy();
        expect(bool2).toBeTruthy();
        expect(bool3).toBeFalsy();
    })
    
    test("isInGroup handles nonexistent userID as expected", async () => {
        const bool = await isInGroup("nonExist");
        expect(bool).toBeFalsy();
    })
    
    test("isInGroup handles incorrect user type as expected", async () => {
        const bool = await isInGroup(2345);
        expect(bool).toBeFalsy;
    })
})
describe("testing joinGroup", () => {
    beforeAll(() => {
        return (leaveGroup("123456", "test123"), leaveGroup("123456", "test456"))
    })
    afterEach(() =>{
        return (leaveGroup("123456", "test123"), leaveGroup("123456", "test456"))
    })

    test("joinGroup functions correctly", async () => {
        const bool1 = await joinGroup("123456", "test123");
        expect(bool1).toBeTruthy();
    })
    
    test("joinGroup handles nonexistent group as expected", async () => {
        const bool = await joinGroup("696969", "test123");
        expect(bool).toBeFalsy();
    })
    
    test("joinGroup handles nonexistent user as expected", async () => {
        const bool = await joinGroup("123456", "notExist");
        expect(bool).toBeFalsy();
    })
    
    test("joinGroup handles incorrect group type as expected", async () => {
        const bool = await joinGroup(123456, "fuckOFF");
        expect(bool).toBeFalsy();
    })
    
    test("joinGroup handles incorrect user type as expected", async () => {
        const bool = await joinGroup("123456", 123);
        expect(bool).toBeFalsy();
    })

})
describe("testing leaveGroup", () => {
    beforeAll(() => {
        return (leaveGroup("123456", "test123"), leaveGroup("123456", "test456"))
    })

    test("leaveGroup functions as expected", async () => {
        await joinGroup("123456", "test123");
        const bool1 = await leaveGroup("123456", "test123");
        expect(bool1).toBeTruthy;
    })
    
    test("leaveGroup deletes group if empty", async () => {
        await createGroup("102030", "test123");
        await leaveGroup("102030", "test123");
        const bool1 = await joinGroup("102030", "test123");
        const data = await getUsers("102030");
        expect(data).toHaveLength(0);
        expect(bool1).toBeFalsy();
    })

    test("leaveGroup handles nonexistent group as expected", async () => {
        const bool = await leaveGroup("696969", "test123");
        expect(bool).toBeFalsy();
    })

    test("leaveGroup handles nonexistent user as expected", async () => {
        const bool = await leaveGroup("123456", "notExist");
        expect(bool).toBeFalsy();
    })

    test("leaveGroup handles incorrect group type as expected", async () => {
        const bool = await leaveGroup(123456, "test123");
        expect(bool).toBeFalsy();
    })

    test("leaveGroup handles incorrect user type as expected", async () => {
        const bool = await leaveGroup("123456", 23456);
        expect(bool).toBeFalsy();
    })
})


describe("testing createGroup", () => {
    test("createGroup functions correctly", async () => {
        const data1 = await getUsers("696969");
        expect(data1).toHaveLength(0);
    
        const bool = await createGroup("696969", "test123");
    
        const data2 = await getUsers("696969");
        expect(data2).toHaveLength(1);
        expect(bool).toBeTruthy();
        await leaveGroup("696969", "test123");
    })

    test("createGroup handles nonexistent user as expected", async () => {
        const bool = await createGroup("696969", "notExist");
        expect(bool).toBeFalsy();
    })

    test("createGroup handles incorrect group input type as expected", async () => {
        const bool = await createGroup(696969, "test123");
        expect(bool).toBeFalsy();
    })
    test("createGroup handles incorrect user input type as expected", async () => {
        const bool = await createGroup("696969", 2345);
        expect(bool).toBeFalsy();
    })
})

describe("testing getUsers", () => {
    beforeEach(() => {
        return (leaveGroup("123456", "test123"), leaveGroup("123456", "test456"))
    })
    afterAll(() => {
        return (leaveGroup("123456", "test123"), leaveGroup("123456", "test456"))
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

    test("getUsers handles nonexistent group as expected", async () =>  {
        const data = await getUsers("696969");
        expect(data).toHaveLength(0);
    })

    test("getUsers handles incorrect input type correctly", async () => {
        const data = await getUsers(123456);
        expect(data).toBeFalsy();
    })
})

describe("testing getSharedPantry", () => {
    beforeAll(() => {
        return (makeTestPantry("testG1"), makeTestPantryG2(), joinGroup("456789", "testG1"), joinGroup("456789", "testG2"))
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

    test("getSharedPantry handles nonexistent group as expected", async () => {
        const data = await getSharedPantry("696969");
        expect(data).toHaveLength(0);
    })

    test("getSharedPantry handles incorrect input type as expected", async () => {
        const bool = await getSharedPantry(696969);
        expect(bool).toBeFalsy();
    })
});