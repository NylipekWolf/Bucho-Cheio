import z from "zod";
export const produtoResponse = z
  .object({
    nome: z.string().describe("Nome do prato no cardapio"),
    preco: z
      .number()
      .positive()
      .describe("Preço do prato no cardapio"),
    categoria: z.object({}),
    descricao: z.string().describe("Descrição do prato no cardapio"),
    avisos: z.string().describe("Aviso de possiveis conteudos alergicos"),
    imagem: z.string().describe("Imagem"),
    id: z.number().positive(),
  })
  .describe("Produto Response");
export const createProduto = z
  .object({
    nome: z.string().max(75).min(1),
    preco: z.number({}).max(4).min(1),
    descricao: z.string().max(100).min(1),
    avisos: z.string().max(50).min(1),
  })
  .describe("Create Produto");
