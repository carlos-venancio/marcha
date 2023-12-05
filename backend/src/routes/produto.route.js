import { Router } from "express";
import controller from "../controllers/produto.controller.js";
import uploader from "../config/multer.js";
import { descriptografarTokenUsuario } from "../middlewares/global.middleware.js";
import {
  validarIdProduto,
  validarInfoProduto,
} from "../middlewares/produto.middleware.js";

const routes = Router();

/**
 * @swagger
 * /produto:
 *   post:
 *     tags:
 *       - Produto
 *     summary: cadastrar um produto
 *     description: Realiza o cadastro de um produto
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: produto
 *         description: Informações do produto
 *         schema:
 *           type: object
 *           required:
 *             - userId
 *             - marcanome
 *             - modelo
 *             - genero
 *             - preco
 *             - tamanho
 *             - cores
 *             - tags
 *             - imagem
 *           properties:
 *             userId:
 *               type: string
 *               example: 654b975e7479aaef625151ca
 *             marcanome:
 *               type: string
 *               example: adidas
 *             modelo:
 *               type: string
 *               example: Tênis Adidas Runfalcon 2.0 Azul
 *             genero:
 *               type: enum("masculino", "feminino","unissex")
 *               example: feminino
 *             preco:
 *               type: number
 *               example: 379.9
 *             tamanho:
 *               type: number
 *               example: 32
 *             cores:
 *               type: array
 *               items: 
 *                  type: object
 *                  description: Relação de cor e quantidade
 *                  example: [{"azul claro": 2},{"preto": 1}]
 *             tags:
 *               type: array
 *               items:
 *                  type: string
 *                  example: [corrida]
 *             imagem:
 *                type: file
 *
 *     responses:
 *       201:
 *         description: OK
 *       400:
 *         description: Credenciais inválidas
 *       500:
 *         description: Requisição mal formatada
 */

// rota para cadastrar um novo produto
routes.post(
  "/",
  uploader.imagemECampos.single("imagem"),
  controller.cadastrarProduto
);

/**
 * @swagger
 * /produto/todos/{token}:
 *   get:
 *     tags:
 *       - Produto
 *     summary: consulta todos os produtos de um usuario
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: token
 *         description: Token referente à sessão do usuário
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Produtos consultados com sucesso
 *                  data:
 *                    type: array
 *                    items:
 *                     type: object
 *                     schema:
 *                        properties:
 *                          _id:
 *                            type: string
 *                          fk_marcanome:
 *                             type: string
 *                          imagem:
 *                             type: string
 *                          modelo:
 *                             type: string
 *                          genero:
 *                             type: string
 *                          preco:
 *                             type: number
 *                          tamanho:
 *                            type: integer
 *                          fk_tags:
 *                            type: array
 *                            items:
 *                              type: string
 *                    example:
 *                      - id: 656bafa4767b47f73b87e18c
 *                        fk_marcanome: nike
 *                        imagem: src\\uploads\\1701556132964.jpg
 *                        modelo: "tênis nike air  soft"
 *                        genero: feminino
 *                        preco: 379.9
 *                        tamanho: 32
 *                        fk_tags:  [corrida,com cadarço]
 *       400:
 *         description: Credenciais inválidas
 *         content:
 *            application/json:
 *                schema:
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: token expired
 *       500:
 *         description: Requisição mal formatada
 * 

 */

// rota para consultar todos os produtos de um usuario
routes.get(
  "/todos/:token",
  descriptografarTokenUsuario,
  controller.consultarTodosPorUsuario
);

/**
 * @swagger
 * /produto/{id}/{token}:
 *   delete:
 *     tags:
 *       - Produto
 *     summary: deleta um produto
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: token
 *         description: Token referente à sessão do usuário
 *         required: true
 *       - in: path
 *         name: id
 *         description: id do produto que será deletado
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Credenciais inválidas
 *         content:
 *            application/json:
 *                schema:
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: token expired
 *       500:
 *         description: Requisição mal formatada
 */

// rota para deletar um usuario
routes.delete(
  "/:id/:token",
  descriptografarTokenUsuario,
  validarIdProduto,
  controller.deletarProduto
);

/**
 * @swagger
 * /produto/campo/{id}:
 *   patch:
 *     tags:
 *       - Produto
 *     summary: atualiza os dados do produto
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id do produto que será alterado
 *         required: true
 *       - in: body
 *         name: produto
 *         required: true
 *         description: Informações do produto
 *         properties:
 *             userId:
 *               type: string
 *               example: 654b975e7479aaef625151ca
 *             marcanome:
 *               type: string
 *               example: adidas
 *             modelo:
 *               type: string
 *               example: Tênis Adidas Runfalcon 2.0 Azul
 *             genero:
 *               type: enum("masculino", "feminino","unissex")
 *               example: feminino
 *             preco:
 *               type: number
 *               example: 379.9
 *             tamanho:
 *               type: number
 *               example: 32
 *             cores:
 *               type: array
 *               items:
 *                  type: object
 *                  description: Relação de cor e quantidade
 *                  example: {"azul claro": 2}
 *             tags:
 *               type: array
 *               items:
 *                  type: string
 *                  example: [corrida]
 *             
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 properties:
 *                  message:
 *                      type: string
 *                      example: Campos alterados com sucesso
 *                  data:
 *                    type: object
 *                    properties:
 *                          _id:
 *                            type: string
 *                          fk_marcanome:
 *                             type: string
 *                          imagem:
 *                             type: string
 *                          modelo:
 *                             type: string
 *                          genero:
 *                             type: string
 *                          preco:
 *                             type: number
 *                          tamanho:
 *                            type: integer
 *                          fk_tags:
 *                            type: array
 *                            items:
 *                              type: string
 *                          cores:
 *                            type: array
 *                            items:
 *                              type: object
 *                              additionalProperties:
 *                                  type: number                     
 *              example:
 *                      - id: 656bafa4767b47f73b87e18c
 *                        fk_marcanome: nike
 *                        imagem: src\\uploads\\1701556132964.jpg
 *                        modelo: "tênis nike air  soft"
 *                        genero: feminino
 *                        preco: 379.9
 *                        tamanho: 32
 *                        fk_tags:  [corrida,com cadarço]
 *                        cores: [ branco: 2, preto: 3 ]
 *       400:
 *         description: Credenciais inválidas
 *         content:
 *            application/json:
 *                schema:
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: token expired
 *       500:
 *         description: Requisição mal formatada
 */

// rota para atualizar os dados do produto
routes.patch(
  "/campo/:id",
  validarInfoProduto,
  validarIdProduto,
  controller.alterarCampos
);

/**
 * @swagger
 * /produto/hidden/{id}/{token}:
 *   patch:
 *     tags:
 *       - Produto
 *     summary: altera a visibilidade de um produto
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id do produto que será alterado
 *         required: true
 *       - in: path
 *         name: token
 *         description: Token do usuario
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *              schema:
 *                properties:
 *                  message:
 *                      type: string
 *                      example: Visibilidade alterada com sucesso
 *                  data:
 *                    type: object
 *                    properties:
 *                          modelo:
 *                             type: string
 *                          active:
 *                             type: boolean
 *                    example:
 *                      - modelo: "tênis nike air  soft"
 *                        active: false

 *       400:
 *         description: Credenciais inválidas
 *         content:
 *            application/json:
 *                schema:
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: token expired
 *       500:
 *         description: Requisição mal formatada
 */

// rota para alterar a visualização do produto
routes.patch(
  "/hidden/:id/:token",
  descriptografarTokenUsuario,
  validarIdProduto,
  controller.alterarVisibilidade
);

/**
 * @swagger
 * /produto/imagem/{id}/{token}:
 *   patch:
 *     tags:
 *       - Produto
 *     summary: altera uma imagem
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id do produto que será alterado
 *         required: true
 *       - in: path
 *         name: token
 *         description: Token do usuario
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 properties:
 *                  message:
 *                      type: string
 *                      example: Imagem alterada com sucesso
 *                  data:
 *                    type: object
 *                    properties:
 *                          _id:
 *                            type: string
 *                          fk_marcanome:
 *                             type: string
 *                          imagem:
 *                             type: string
 *                          modelo:
 *                             type: string
 *                          genero:
 *                             type: string
 *                          preco:
 *                             type: number
 *                          tamanho:
 *                            type: integer
 *                          fk_tags:
 *                            type: array
 *                            items:
 *                              type: string
 *                          cores:
 *                            type: array
 *                            items:
 *                              type: object
 *                              additionalProperties:
 *                                  type: number                     
 *              example:
 *                      - id: 656bafa4767b47f73b87e18c
 *                        fk_marcanome: nike
 *                        imagem: src\\uploads\\1701556132964.jpg
 *                        modelo: "tênis nike air  soft"
 *                        genero: feminino
 *                        preco: 379.9
 *                        tamanho: 32
 *                        fk_tags:  [corrida,com cadarço]
 *                        cores: [ branco: 2, preto: 3 ]
 *       400:
 *         description: Credenciais inválidas
 *         content:
 *            application/json:
 *                schema:
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: token expired
 *       500:
 *         description: Requisição mal formatada
 */

// rota para atualizar a imagem do produto
routes.patch(
  "/imagem/:id/:token",
  descriptografarTokenUsuario,
  validarIdProduto,
  uploader.imagem.single("imagem"),
  controller.alterarImagem
);

/**
 * @swagger
 * /produto/{id}/{token}:
 *   get:
 *     tags:
 *       - Produto
 *     summary: consulta um produto individualmente
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id do produto
 *         required: true
 *       - in: path
 *         name: token
 *         description: Token do usuario
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                 properties:
 *                  message:
 *                      type: string
 *                      example: Produto encontrado com sucesso
 *                  data:
 *                    type: object
 *                    properties:
 *                          _id:
 *                            type: string
 *                          fk_marcanome:
 *                             type: string
 *                          imagem:
 *                             type: string
 *                          modelo:
 *                             type: string
 *                          genero:
 *                             type: string
 *                          preco:
 *                             type: number
 *                          tamanho:
 *                            type: integer
 *                          fk_tags:
 *                            type: array
 *                            items:
 *                              type: string
 *                          cores:
 *                            type: array
 *                            items:
 *                              type: object
 *                              additionalProperties:
 *                                  type: number                     
 *              example:
 *                      - id: 656bafa4767b47f73b87e18c
 *                        fk_marcanome: nike
 *                        imagem: src\\uploads\\1701556132964.jpg
 *                        modelo: "tênis nike air  soft"
 *                        genero: feminino
 *                        preco: 379.9
 *                        tamanho: 32
 *                        fk_tags:  [corrida,com cadarço]
 *                        cores: [ branco: 2, preto: 3 ]
 *       400:
 *         description: Credenciais inválidas
 *         content:
 *            application/json:
 *                schema:
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: token expired
 *       500:
 *         description: Requisição mal formatada
 */

// rota para consultar um produto especifico
routes.get(
  "/:id/:token",
  descriptografarTokenUsuario,
  validarIdProduto,
  controller.consultarProdutoPorId
);

export default routes;
