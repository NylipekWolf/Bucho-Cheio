import { FornecedorContatoRequest } from './fornecedor-contato-request.interface';

export interface FornecedorRequest {
  nome: string;
  endereco: {
    id?: number;
    logradouro: string;
    numero: number;
    cep: string;
    complemento: string;
  };
  contatos: FornecedorContatoRequest[];
}
