const chai = require("chai");
const { expect } = chai;

const {
  StatusCodes: { CREATED, BAD_REQUEST, OK, UNAUTHORIZED, CONFLICT, NOT_FOUND, NO_CONTENT },
} = require("http-status-codes");

describe("1 - Utilizando a rota '/users' ", () => {
  describe("ao tentar criar um novo usuário", () => {
    let response;

    it('retorna Status HTTP 201 - "CREATED"', () => {
      expect(response).to.have.status(CREATED);
    });

    it("retorna um Objeto", () => {
      expect(response.body).to.be.a("object");
    });

    it('com a propriedade "token"', () => {
      expect(response.body).to.have.property("token");
    });
  });

  describe("Checa se o usuário é único", () => {
    it("retorna status HTTP - 409 'CONFLICT' ", () => {
      expect(response).to.have.status(CONFLICT);
    });
    it("retorna um Objeto", () => {
      expect(response.body).to.be.a("object");
    });
    it("com a propriedade 'message'", () => {
      expect(response.body).to.have.property("message");
    });
    it("com a mensagem 'Usuário já existe'", () => {
      expect(response.body.message).to.be.equal("Usuário já existe");
    });
  });

  describe("checa se o usuário está inserindo os inputs corretamente", () => {
    it("Verifica se 'Nome' foi inserido!", () => {
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("'displayName' is required");
    });
    it("Verifica se 'Nome' possui ao menos 8 caracteres!", () => {
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal(
        "'displayName' length must be at least 8 characters long"
      );
    });
    it("Email é requerido!", () => {
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("'email' is required");
    });
    it("Email sem o nome do usuário!", () => {
      // sem o nome do email
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal(
        "'email' must be a valid email"
      );
    });
    it("Email sem o domínio!", () => {
      // sem o dominio do email
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal(
        "'email' must be a valid email"
      );
    });
    it("Password é requerido!", () => {
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("'password' is required");
    });
    it("Verifica se 'Email' possui ao menos 6 caracteres!", () => {
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal(
        "'password' length must be at least 6 characters long"
      );
    });
  });
});

describe("2 - Utilizando a rota '/login'", () => {
  describe("chega se o usuário loga da forma correta", () => {
    it('retorna Status HTTP 200 - "OK"', () => {
      expect(response).to.have.status(OK);
    });
    it("retorna um Objeto", () => {
      expect(response.body).to.be.a("object");
    });
    it('com a propriedade "token"', () => {
      expect(response.body).to.have.property("token");
    });
  });
  describe("checa se o usuário está inserindo os inputs corretamente", () => {
    it("Email é requerido!", () => {
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("'email' is required");
    });
    it("Email não pode ser vazio!", () => {
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal(
        "'email' is not allowed to be empty"
      );
    });
    it("Password é requerido!", () => {
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("'password' is required");
    });
    it("Password não pode ser vazio!", () => {
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal(
        "'password' is not allowed to be empty"
      );
    });
    it("Verifica se as credenciais estão incorretas", () => {
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Campos inválidos");
    });
  });
});

describe("3 - Utilizando a rota GET '/users'", () => {
  describe("Verifica-se a possibilidade de obter a lista de todos os usuários", () => {
    it("Devidamente autenticado", () => {
      expect(response).to.have.status(OK);
      expect(response.body).to.be.a("array");
    });
    it("Sem o token", () => {
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Token não encontrado");
    });
    it("Token adulterado", () => {
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Token expirado ou inválido");
    });
  });
});

describe("4 - Utilizando a rota GET '/users/:id'", () => {
  describe("Verifica-se retorna a pessoa usuária buscada", () => {
    it("Devidamente autenticado", () => {
      expect(response).to.have.status(OK);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("displayName");
      expect(response.body).to.have.property("email");
      expect(response.body).to.have.property("image");
    });
    it("se a pessoa usuária não existe", () => {
      expect(response).to.have.status(NOT_FOUND);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Usuário não existe");
    });
    it("Sem o token", () => {
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Token não encontrado");
    });
    it("Token adulterado", () => {
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Token expirado ou inválido");
    });
  });
});

describe("5 - Utilizando a rota DELETE '/users/me'", () => {
  describe("Verifica-se deleta o usuário", () => {
    it("Obtendo sucesso", () => {
      expect(response).to.have.status(NO_CONTENT);
    });
    it("Sem o token", () => {
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Token não encontrado");
    });
    it("Token adulterado", () => {
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Token expirado ou inválido");
    });
  });
});
