const fs = require('fs');
const path = require('path');

// Função para excluir todos os arquivos da pasta public/arquivos
function excluirArquivos(pastaArquivos) {

  return new Promise((resolve, reject) => {
    // Lê o conteúdo da pasta 'public/arquivos'
    fs.readdir(pastaArquivos, (err, arquivos) => {
      if (err) {
        return reject({ message: 'Erro ao ler a pasta public/arquivos', error: err });
      }

      if (arquivos.length === 0) {
        return reject({ message: 'Nenhum arquivo encontrado para excluir.' });
      }

      // Itera sobre os arquivos e deleta um por um
      arquivos.forEach(arquivo => {
        const arquivoPath = path.join(pastaArquivos, arquivo);

        // Verifica se é um arquivo e o deleta
        fs.unlink(arquivoPath, (err) => {
          if (err) {
            console.error('Erro ao excluir o arquivo:', arquivoPath, err);
          }
        });
      });

      resolve({ message: 'Todos os arquivos foram excluídos com sucesso.' });
    });
  });
}

module.exports = excluirArquivos;
