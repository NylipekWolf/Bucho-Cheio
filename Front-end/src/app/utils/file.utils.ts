export function converterArquivoParaBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onloadend = () => {
      if (leitor.result) resolve(leitor.result.toString());
      else reject('Erro ao converter o arquivo para base64');
    };
    leitor.onerror = () => {
      reject(new Error('Erro ao ler o arquivo.'));
    };
    leitor.readAsDataURL(file);
  });
}
