const User = require("../models/User");
const Item = require("../models/Item");

const validUser = new User({ 
    email: "wemby@mvp.fr",
    lastname: "Wemby",
    firstname: "Victor",
    password: "SpursIn5!",
    birthDate: new Date(2004, 5, 13),
    todoList: []
});
const item = new Item({
    name: "Gagner les finales NBA",
    content: ""
});

beforeEach(() => {
    validUser.email = "wemby@mvp.fr";
    validUser.lastname = "Wemby";
    validUser.firstname = "Victor";
    validUser.password = "SpursIn5!";
    validUser.birthDate = new Date(2004, 5, 13);
    validUser.todoList = [];

    item.name = "Gagner les finales NBA";
    item.content = "";
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

describe("Vérification du firstname et lastname", () => {
    test("valide", () => {
        expect(validUser.firstname).toBeDefined();
        expect(validUser.lastname).toBeDefined();
    });

    test("doit être trim", () => {
        const trimFirstname = validUser.firstname.trim();
        const trimLastname = validUser.lastname.trim();

        expect(validUser.firstname).toBe(trimFirstname);
        expect(validUser.lastname).toBe(trimLastname);
    });

    test("ne contient pas d'espacement", () => {
        expect(validUser.firstname).not.toMatch(/\s/);
        expect(validUser.lastname).not.toMatch(/\s/);
    });
});

describe("Vérification du mot de passe", () => {
    test("contient entre 8 et 40 caractères, au minimum une majuscule, une minuscule et un chiffre", () => {
        expect(validUser.password).toMatch(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
    });

    test("doit contenir plus de 8 caractères", () => {
        const shortPwd = "GoSpurs";
        expect(shortPwd.length).not.toBeGreaterThanOrEqual(8)
    })
});

describe("Vérification de l'âge", () => {
    test("plus de 13 ans", () => {
        const thirteenYearsAgo = new Date();
        thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);

        expect(validUser.birthDate).toBeInstanceOf(Date);
        expect(validUser.birthDate.getTime()).toBeLessThan(thirteenYearsAgo.getTime());
    });
});

describe("Vérifie que la todo list soit correct", () => {
    test("User a une todo list", () => {
        expect(validUser.todoList).toBeDefined();
    });

    test("Contient de 0 à 10 items", () => {
        for (let i = 0; i < 10; i++) {
            expect(validUser.todoList.length).toEqual(i);
            validUser.todoList.push(item);
        }
    });

    test("content contient maximum 1000 caractères", () => {
        for (let i = 0; i < 100; i++) {
            item.content += "aaaaaaaaaaa";
        }
        expect(item.content.length).not.toBeLessThanOrEqual(1000);
    });
});