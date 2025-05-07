export interface FornecedorEnderecoRequest {
  endereco: {
    id: number;
    logradouro: string;
    numero: number;
    cep: string;
    complemento: string;
  };
}
