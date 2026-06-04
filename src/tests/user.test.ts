const User = require("../models/User");
const Item = require("../models/Item");

const validUser = new User();
const item = new Item();

beforeEach(() => {
    validUser.email = "wemby@mvp.fr",
    validUser.lastname = "Wemby",
    validUser.firstname = "Victor",
    validUser.password = "SpursIn5!",
    validUser.birthDate = new Date(2004, 5, 13),
    validUser.todoList = []
});

describe("Vérification de l'email", () => {
    test("valide", () => {
        expect(validUser.email).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    });

    test("doit contenir un @", () => {
        validUser.email = "wembymvp.fr"
        expect(validUser.email).not.toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    });

    test("doit contenir un .", () => {
        validUser.email = "wemby@mvpfr"
        expect(validUser.email).not.toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    });
});

describe("Vérifie que l'utilisateur soit correct", () => {
    test("User a un lastname", () => {
        expect(validUser.lastname).toBeDefined();
    });

    test("User a un firstname", () => {
        expect(validUser.firstname).toBeDefined();
    });

    test("Le password contient entre 8 et 40 caractères, au minimum une majuscule, une minuscule et un chiffre", () => {
        expect(validUser.password).toMatch(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
    });

    test("User a plus de 13 ans", () => {
        const thirteenYearsAgo = new Date();
        thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);

        expect(validUser.birthDate).toBeInstanceOf(Date);
        expect(validUser.birthDate.getTime()).toBeLessThan(thirteenYearsAgo.getTime());
    });

    test("User a une todo list", () => {
        expect(validUser.todoList).toBeDefined();
    });
});

describe("Vérifie que la todo list soit correct", () => {
    test("Contient de 0 à 10 items", () => {
        for (let i = 0; i < 10; i++) {
            expect(validUser.todoList.length).toEqual(i);
            validUser.todoList.push(item);
        }
    });

    test("Contient un nom unique", () => {
        
    });
});