
// Força o Jest a substituir o comportamento da biblioteca por uma string fake limpa
jest.mock("uuid", () => ({
    v4: () => "id-falso-de-teste-uuidv14",
}));
