import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { FornecedorFilter } from './filters/fornecedor-filter.interface';
import { FornecedorResponse } from './responses/fornecedor-response.interface';
import { FornecedorRequest } from './requests/fornecedor-request.interface';
import { FornecedorEnderecoRequest } from './requests/fornecedor-endereco-request.interface';
import { FornecedorContatoRequest } from './requests/fornecedor-contato-request.interface';
import { FornecedorEnderecoResponse } from './responses/fornecedor-endereco-response.interface';
import { FornecedorContatosResponse } from './responses/fornecedor-contatos-response.interface';

const base = `${environment.base}/fornecedor`;
@Injectable()
export class FornecedorService {
  constructor(private readonly _httpClient: HttpClient) {}

  public search(query?: FornecedorFilter): Observable<FornecedorResponse[]> {
    const params = new HttpParams({ fromObject: Object(query) });
    return this._httpClient.get<FornecedorResponse[]>(base, {
      params,
    });
  }
  public adicionar(
    request?: FornecedorRequest
  ): Observable<FornecedorResponse> {
    return this._httpClient.post<FornecedorResponse>(base, request);
  }

  public atualizarEndereco(
    request?: FornecedorEnderecoRequest
  ): Observable<FornecedorEnderecoResponse> {
    return this._httpClient.put<FornecedorEnderecoResponse>(
      `${base}/endereco`,
      request
    );
  }

  public atualizarContatos(
    request?: FornecedorContatoRequest
  ): Observable<FornecedorContatosResponse[]> {
    return this._httpClient.put<FornecedorContatosResponse[]>(
      `${base}/contatos`,
      request
    );
  }
}
