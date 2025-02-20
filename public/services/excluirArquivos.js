const fs = require('fs');
const path = require('path');

// Função para excluir todos os arquivos e pastas dentro de public/arquivos
function excluirArquivos(pastaArquivos) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(pastaArquivos)) {
      return reject({ message: 'O diretório public/arquivos não existe.' });
    }

    // Lê o conteúdo da pasta 'public/arquivos'
    fs.readdir(pastaArquivos, (err, itens) => {
      if (err) {
        return reject({ message: 'Erro ao ler a pasta public/arquivos', error: err });
      }

      if (itens.length === 0) {
        return reject({ message: 'Nenhum arquivo ou pasta encontrado para excluir.' });
      }

      // Função para excluir arquivos e pastas recursivamente
      const excluirItem = (itemPath) => {
        return new Promise((resolve, reject) => {
          fs.stat(itemPath, (err, stats) => {
            if (err) return reject(err);

            if (stats.isDirectory()) {
              // Se for uma pasta, remove recursivamente
              fs.rm(itemPath, { recursive: true, force: true }, (err) => {
                if (err) return reject(err);
                resolve();
              });
            } else {
              // Se for um arquivo, remove diretamente
              fs.unlink(itemPath, (err) => {
                if (err) return reject(err);
                resolve();
              });
            }
          });
        });
      };

      // Executa a exclusão para cada item dentro da pasta
      Promise.all(itens.map(item => excluirItem(path.join(pastaArquivos, item))))
        .then(() => resolve({ message: 'Todos os arquivos e pastas foram excluídos com sucesso.' }))
        .catch(reject);
    });
  });
}

module.exports = excluirArquivos;
