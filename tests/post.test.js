const chai = require("chai");
const { expect } = chai;

const {
  StatusCodes: { CREATED, BAD_REQUEST, OK, UNAUTHORIZED, CONFLICT, NOT_FOUND, NO_CONTENT },
} = require("http-status-codes");

describe("6 - Utilizando a rota POST '/post' ", () => {
  describe("ao tentar criar um novo post", () => {
    let response;

    it('retorna Status HTTP 201 - "CREATED"', () => {
      expect(response).to.have.status(CREATED);
    });

    it("retorna um Objeto", () => {
      expect(response.body).to.be.a("object");
    });

    it('com a propriedades corretas', () => {
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("content");
      expect(response.body).to.have.property("userId");
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

    describe("checa se o usuário está inserindo os inputs corretamente", ()=> {
      it("Se o título está sendo inserido", () => {
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.equal("'title' is required");
      })
      it("Se o conteúdo está sendo inserido", () => {
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.equal("'content' is required");
      })      
    })
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

describe("7 - Utilizando a rota GET '/post'", () => {
  describe("checa se o usuário consegue a lista de posts corretamente", () => {
    it('retorna Status HTTP 200 - "OK"', () => {
      expect(response).to.have.status(OK);
    });
    it("retorna um array", () => {
      expect(response.body).to.be.a("array");
    });
  });
  describe("Verifica-se a autenticação de obter a lista de todos os posts", () => {
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
  })
});

describe("8 - Utilizando a rota GET '/post/:id'", () => {
  describe("Verifica-se a possibilidade de obter a lista de todos os usuários", () => {
    it("Devidamente autenticado", () => {
      expect(response).to.have.status(OK);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("published");
      expect(response.body).to.have.property("updated");
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("content");
      expect(response.body).to.have.property("user");
      expect(response.body.user).to.have.property("id");
      expect(response.body.user).to.have.property("displayName");
      expect(response.body.user).to.have.property("email");
      expect(response.body.user).to.have.property("image");
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
    it("Verifica se o post existe", () => {
      expect(response).to.have.status(NOT_FOUND);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Post não existe");
    })
  });
});

describe("9 - Utilizando a rota PUT '/post/:id'", () => {
  describe("Verifica-se o post é editado com sucesso", () => {
    it("Devidamente autenticado", () => {
      expect(response).to.have.status(OK);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("content");
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("userid");
    });
    it("Verifica se o post existe", () => {
      expect(response).to.have.status(NOT_FOUND);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Post não existe");
    })
    it("Se o título está sendo inserido", () => {
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("'title' is required");
    })
    it("Se o conteúdo está sendo inserido", () => {
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("'content' is required");
    })
    it("somente o dono do post pode edita-lo", () => {
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Usuário não autorizado");
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

describe("5 - Utilizando a rota DELETE '/post/:id'", () => {
  describe("Verifica-se deleta o post", () => {
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
    it("Verifica se o post existe", () => {
      expect(response).to.have.status(NOT_FOUND);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Post não existe");
    })
    it("somente o dono do post pode deleta-lo", () => {
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Usuário não autorizado");
    });
  });
});
