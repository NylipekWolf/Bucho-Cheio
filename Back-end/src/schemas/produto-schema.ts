import z, { number } from "zod";
export const produtoResponse = z
  .object({
    id: number().int(),
    nome: z.string().describe("Nome do prato no cardapio"),
    preco: z
      .number()
      .positive()
      .finite()
      .describe("Preço do prato no cardapio"),
    categoria: z.object({}),
    descricao: z.string().describe("Descrição do prato no cardapio"),
    avisos: z.string().describe("Aviso de possiveis conteudos alergicos"),
    imagem: z.string().describe("Imagem"),
  })
  .describe("Produto Response");
export const produtoRequest = z
  .object({
    id: number().int().optional(),
    nome: z.string().max(75).min(1),
    preco: z.number(),
    descricao: z.string().max(100).min(1),
    avisos: z.array(z.string().max(50).min(1)),
    imagem: z.string(),
  })
  .describe("Create Produto");
