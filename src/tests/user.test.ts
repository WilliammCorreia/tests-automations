import User from "../models/User";
import Item from "../models/Item";
import userService from "../services/user.service";
import emailSenderService from "../services/emailSender.service";
import request from 'supertest';
import app, { server } from "../server";
import mongoose from 'mongoose';

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

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});

beforeEach(async () => {
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

    test("sendEmail est appelé avec les bons arguments", async () => {
        const spyEmail = jest.spyOn(emailSenderService, "sendEmail").mockResolvedValue();
        
        const mockUser = {
            email: validUser.email,
            todoList: Array(7).fill({
                name: "Ancien item",
                content: "",
                createdAt: new Date(Date.now() - 40 * 60000)
            }),
            save: jest.fn().mockResolvedValue(true)
        };

        const spyFindById = jest.spyOn(User, "findById").mockReturnValue({
            populate: jest.fn().mockResolvedValue(mockUser)
        } as any);

        const spyItemCreate = jest.spyOn(require("../services/item.service").default, "create")
            .mockResolvedValue({ name: "Un item", content: "Un contenu", createdAt: new Date() });

        await userService.addItem("fakeId", "Un item", "Un contenu");

        expect(spyEmail).toHaveBeenCalledWith(validUser.email, "Votre todo list est presque pleine !");

        spyEmail.mockRestore();
        spyFindById.mockRestore();
        spyItemCreate.mockRestore();
    });
});

describe("GET /ping", () => {
    test('devrait retourer "pong"', async () => {
        const res = await request(app).get("/ping");

        expect(res.status).toBe(200);
    });
});

describe("GET /api/users/", () => {
    test('devrait retounrer un tableau dutilisateurs', async () => {
        const res = await request(app).get("/api/users/");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});

describe("POST /api/users/", () => {
    let testUser = validUser.toJSON();
    testUser.email = "test.create." + Date.now() + "@test.fr";

    test('devrait créer un nouvel utilisateur', async () => {
        const res = await request(app).post("/api/users/").send(testUser);

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.email).toBe(testUser.email);
    });

    test('devrait retourner une erreur si lemail est dzja utilisé', async () => {
        const res = await request(app).post("/api/users/").send(testUser);

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Cet email est déjà utilisé");
    });

    test('devrait retourner une erreur si un champ est manquant', async () => {
        const res = await request(app).post("/api/users/").send({
            email: testUser.email,
            lastname: testUser.lastname,
            firstname: testUser.firstname,
            password: testUser.password
        });

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("email, lastname, firstname, password et birthDate sont requis");
    });
});

// describe("POST /api/users/addItem", () => {
//     let newUser: any;
//     beforeAll(async () => {
//         await mongoose.connection.dropDatabase();
//         newUser = await userService.create(validUser.email, validUser.lastname, validUser.firstname, validUser.password, validUser.birthDate);
//     });

//     test('devrait ajouter un item à la todo list de lutilisateur', async () => {
//         const res = await request(app).post("/api/users/item").send({
//             userId: newUser._id.toString(),
//             name: "Un item",
//             content: "Un contenu"
//         });

//         expect(res.status).toBe(200);
//         expect(res.body.success).toBe(true);
//         expect(res.body.data.todoList.length).toBe(1);
//         expect(res.body.data.todoList[0].name).toBe("Un item");
//     });
// });