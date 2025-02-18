const fs = require('fs');
const path = require('path');

function listarArquivosGerados(pastaArquivos) {
  return new Promise((resolve, reject) => {
    const arquivos = [];

    // Lê a pasta principal que contém as subpastas de squad
    fs.readdir(pastaArquivos, { withFileTypes: true }, (err, directories) => {
      if (err) {
        return reject('Erro ao ler a pasta principal');
      }

      // Filtra apenas as pastas dentro da pasta principal (representam os squads)
      directories.filter(dir => dir.isDirectory()).forEach(squadDir => {
        const squadPath = path.join(pastaArquivos, squadDir.name); // Caminho para a pasta do squad

        // Lê os arquivos dentro de cada pasta de squad
        fs.readdir(squadPath, (err, files) => {
          if (err) {
            return reject(`Erro ao ler a pasta do squad ${squadDir.name}`);
          }

          files.forEach(file => {
            const filePath = path.join(squadPath, file);
            const stats = fs.statSync(filePath);
            const dateCreated = stats.birthtime.toISOString(); // Data completa do arquivo

            // Adiciona os arquivos à lista sem validar a data de criação
            arquivos.push({
              nome: file,
              squad: squadDir.name, // Nome do squad (pasta)
              dataHora: dateCreated.slice(0, 19).replace('T', ' '), // Data e hora formatada
              downloadUrl: `/arquivos/${squadDir.name}/${file}` // Caminho para o arquivo para download
            });
          });

          // Resolve a promessa com os arquivos encontrados depois de iterar todos os squads
          if (squadDir === directories[directories.length - 1]) {
            resolve(arquivos);
          }
        });
      });
    });
  });
}

module.exports = listarArquivosGerados;
